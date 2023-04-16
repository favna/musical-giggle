import { Command } from '@sapphire/framework';

export class UserCommand extends Command {
  public constructor(context: Command.Context) {
    super(context, {
      description: 'A basic chat input command that pings'
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder //
          .setName(this.name)
          .setDescription(this.description),
      { guildIds: ['838895946397646850'] }
    );
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    return interaction.reply('Ping!');
  }
}
