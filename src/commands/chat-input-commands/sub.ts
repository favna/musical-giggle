import { Subcommand } from '@sapphire/plugin-subcommands';

export class UserCommand extends Subcommand {
  public constructor(context: Subcommand.Context) {
    super(context, {
      description: 'Chat Input Command with some subcommand groups',
      subcommands: [
        {
          type: 'group',
          name: 'config',
          entries: [
            { name: 'edit', chatInputRun: 'configEdit', preconditions: ['NSFW'] },
            { name: 'show', chatInputRun: 'configShow', default: true },
            { name: 'remove', chatInputRun: 'configRemove' },
            { name: 'reset', chatInputRun: 'configReset' }
          ]
        }
      ]
    });
  }

  public override registerApplicationCommands(registry: Subcommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
        .addSubcommandGroup((input) =>
          input
            .setName('config')
            .setDescription('Config group')
            .addSubcommand((input) => input.setName('edit').setDescription('Edit subcommand'))
            .addSubcommand((input) => input.setName('show').setDescription('[Default] Show subcommand'))
            .addSubcommand((input) => input.setName('remove').setDescription('Remove subcommand'))
            .addSubcommand((input) => input.setName('reset').setDescription('Reset subcommand'))
        )
    );
  }

  public async configShow(interaction: Subcommand.ChatInputCommandInteraction) {
    return interaction.reply('Showing!');
  }

  public async configEdit(interaction: Subcommand.ChatInputCommandInteraction) {
    return interaction.reply('Editing!');
  }

  public async configRemove(interaction: Subcommand.ChatInputCommandInteraction) {
    return interaction.reply('Removing!');
  }

  public async configReset(interaction: Subcommand.ChatInputCommandInteraction) {
    return interaction.reply('Resetting!');
  }
}
