import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { SumUtility } from '../../utilities/sum';

@ApplyOptions<Command.Options>({
  description: 'A basic chat input command that pings'
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    interaction.deferReply({ ephemeral: true });
    return interaction.editReply({
      content: `Test ${this.container.utilities.sum.add(1, 2)}`
    });
    // return interaction.reply('Ping!');
  }
}

declare module '@sapphire/plugin-utilities-store' {
  export interface Utilities {
    sum: SumUtility;
  }
}
