import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
  description: 'A basic chat input command that pings'
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder //
          .setName(this.name)
          .setDescription(this.description),
      { guildIds: ['838895946397646850'] }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    return interaction.reply('Ping!');
  }
}
