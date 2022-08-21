import { hideLinkEmbed, userMention } from '@discordjs/builders';
import { ArgumentError, Events, Listener, UserError, type ChatInputCommandErrorPayload } from '@sapphire/framework';
import { codeBlock } from '@sapphire/utilities';
import { envParseArray } from '@skyra/env-utilities';
import { RESTJSONErrorCodes } from 'discord-api-types/v9';
import { DiscordAPIError, HTTPError, type CommandInteraction } from 'discord.js';
import { Emojis } from '../../../lib/constants';

const ignoredCodes = [RESTJSONErrorCodes.UnknownChannel, RESTJSONErrorCodes.UnknownMessage];
const OWNERS = envParseArray('OWNERS');

export class UserListener extends Listener<typeof Events.ChatInputCommandError> {
  public async run(error: Error, { command, interaction }: ChatInputCommandErrorPayload) {
    // If the error was a string or an UserError, send it to the user:
    if (typeof error === 'string') return this.stringError(interaction, error);
    if (error instanceof ArgumentError) return this.argumentError(interaction, error);
    if (error instanceof UserError) return this.userError(interaction, error);

    const { client, logger } = this.container;
    // If the error was an AbortError or an Internal Server Error, tell the user to re-try:
    if (error.name === 'AbortError' || error.message === 'Internal Server Error') {
      logger.warn(`${this.getWarnError(interaction)} (${interaction.user.id}) | ${error.constructor.name}`);
      return this.alert(interaction, 'I had a small network error when messaging Discord. Please run this command again!');
    }

    // Extract useful information about the DiscordAPIError
    if (error instanceof DiscordAPIError || error instanceof HTTPError) {
      if (ignoredCodes.includes(error.code)) {
        return;
      }

      client.emit(Events.Error, error);
    } else {
      logger.warn(`${this.getWarnError(interaction)} (${interaction.user.id}) | ${error.constructor.name}`);
    }

    // Emit where the error was emitted
    logger.fatal(`[COMMAND] ${command.location.full}\n${error.stack || error.message}`);
    try {
      await this.alert(interaction, this.generateUnexpectedErrorMessage(interaction, error));
    } catch (err) {
      client.emit(Events.Error, err as Error);
    }

    return undefined;
  }

  private generateUnexpectedErrorMessage(interaction: CommandInteraction, error: Error) {
    if (OWNERS.includes(interaction.user.id)) return codeBlock('js', error.stack!);
    return `${Emojis.RedCross} I found an unexpected error, please report the steps you have taken to my developers!`;
  }

  private stringError(interaction: CommandInteraction, error: string) {
    return this.alert(interaction, `${Emojis.RedCross} Dear ${userMention(interaction.user.id)}, ${error}`);
  }

  private argumentError(interaction: CommandInteraction, error: ArgumentError<unknown>) {
    return this.alert(
      interaction,
      error.message ??
        `An error occurred that I was not able to identify. Please try again. If the issue keeps showing up, you can get in touch with the developers by joining my support server through ${hideLinkEmbed(
          'https://join.favware.tech'
        )}`
    );
  }

  private userError(interaction: CommandInteraction, error: UserError) {
    if (Reflect.get(Object(error.context), 'silent')) return;

    return this.alert(
      interaction,
      error.message ??
        `An error occurred that I was not able to identify. Please try again. If the issue keeps showing up, you can get in touch with the developers by joining my support server through ${hideLinkEmbed(
          'https://join.favware.tech'
        )}`
    );
  }

  private alert(interaction: CommandInteraction, content: string): Promise<any> {
    if (interaction.replied || interaction.deferred) {
      return interaction.editReply({
        content,
        allowedMentions: { users: [interaction.user.id], roles: [] }
      });
    }

    return interaction.reply({
      content,
      allowedMentions: { users: [interaction.user.id], roles: [] },
      ephemeral: true
    });
  }

  private getWarnError(interaction: CommandInteraction) {
    return `ERROR: /${interaction.guildId}/${interaction.channelId}/${interaction.id}`;
  }
}
