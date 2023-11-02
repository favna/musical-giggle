import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { Subcommand } from '@sapphire/plugin-subcommands';
import { EmbedBuilder } from 'discord.js';

export class UserCommand extends Subcommand {
  public constructor(context: Subcommand.Context) {
    super(context, {
      name: 'aiura',
      description: 'Chat Input Command with some subcommand groups',
      subcommands: [
        {
          name: 'credits',
          chatInputRun: 'chatInputCredits'
        }
      ]
    });
  }

  public override registerApplicationCommands(registry: Subcommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
        .addSubcommand((input) => input.setName('credits').setDescription('Shows credits'))
    );
  }

  public async chatInputCredits(interaction: Subcommand.ChatInputCommandInteraction) {
    await interaction.deferReply();
    await this.creditsBuilder().run(interaction);
  }

  /**
   * Generates an embed message containing the credits for the bot.
   *
   * @return The generated embed message containing the credits.
   */
  creditsBuilder(): PaginatedMessage {
    return new PaginatedMessage({
      template: new EmbedBuilder().setColor('Blue').setTitle('Credits').setTimestamp()
    })
      .setSelectMenuOptions((pageIndex) => ({ label: ['Page', pageIndex + 1].join(' '), value: pageIndex.toString() }))
      .addPageEmbed((embed) => embed.setDescription('Page 1'))
      .addPageEmbed((embed) => embed.setDescription('Page 2'));
  }
}
