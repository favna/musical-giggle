import { Command } from '@sapphire/framework';

export class UserCommand extends Command {
  public constructor(context: Command.LoaderContext) {
    super(context, {
      name: 'cip',
      description: 'A basic chat input command that pings'
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
    );
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    return interaction.reply('Ping!');
  }
}
