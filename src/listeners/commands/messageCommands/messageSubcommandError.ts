import { ArgumentError, Events, Listener, UserError } from '@sapphire/framework';
import { SubcommandPluginEvents, type MessageSubcommandErrorPayload } from '@sapphire/plugin-subcommands';
import { envParseArray } from '@skyra/env-utilities';
import { codeBlock, hideLinkEmbed, userMention, type Message } from 'discord.js';

const OWNERS = envParseArray('OWNERS');

export class UserEvent extends Listener<typeof SubcommandPluginEvents.MessageSubcommandError> {
  public constructor(context: Listener.Context) {
    super(context, {
      event: SubcommandPluginEvents.MessageSubcommandError
    });
  }
  public async run(error: Error, { command, message }: MessageSubcommandErrorPayload) {
    this.container.logger.debug('Subcommand Error triggered');

    // If the error was a string or an UserError, send it to the user:
    if (typeof error === 'string') return this.stringError(message, error);
    if (error instanceof ArgumentError) return this.argumentError(message, error);
    if (error instanceof UserError) return this.userError(message, error);

    const { client, logger } = this.container;
    // Emit where the error was emitted
    logger.fatal(`[COMMAND] ${command.location.full}\n${error.stack || error.message}`);
    try {
      await this.alert(message, this.generateUnexpectedErrorMessage(message, error));
    } catch (err) {
      client.emit(Events.Error, err as Error);
    }

    return undefined;
  }

  private async alert(message: Message, content: string) {
    return message.reply({
      content,
      allowedMentions: { users: [message.author.id], roles: [] }
    });
  }

  private generateUnexpectedErrorMessage(message: Message, error: Error) {
    if (OWNERS.includes(message.author.id)) return codeBlock('js', error.stack!);
    return `I found an unexpected error, please report the steps you have taken to my developers!`;
  }

  private stringError(message: Message, error: string) {
    return this.alert(message, `Dear ${userMention(message.author.id)}, ${error}`);
  }

  private argumentError(message: Message, error: ArgumentError<unknown>) {
    return this.alert(
      message,
      error.message ||
        `An error occurred that I was not able to identify. Please try again. If the issue keeps showing up, you can get in touch with the developers by joining my support server through ${hideLinkEmbed(
          'https://join.favware.tech'
        )}`
    );
  }

  private userError(message: Message, error: UserError) {
    if (Reflect.get(Object(error.context), 'silent')) return;

    return this.alert(
      message,
      error.message ||
        `An error occurred that I was not able to identify. Please try again. If the issue keeps showing up, you can get in touch with the developers by joining my support server through ${hideLinkEmbed(
          'https://join.favware.tech'
        )}`
    );
  }
}
