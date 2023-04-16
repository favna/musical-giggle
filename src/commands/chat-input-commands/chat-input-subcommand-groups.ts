import { Subcommand } from '@sapphire/plugin-subcommands';

export class UserCommand extends Subcommand {
  public constructor(context: Subcommand.Context) {
    super(context, {
      description: 'A basic chat input command with some subcommand groups',
      subcommands: [
        {
          type: 'group',
          name: 'config',
          entries: [
            { name: 'edit', chatInputRun: 'configEdit' },
            { name: 'show', chatInputRun: 'configShow', default: true },
            { name: 'remove', chatInputRun: 'configRemove' },
            { name: 'reset', chatInputRun: 'configReset' }
          ]
        }
      ]
    });
  }

  public override registerApplicationCommands(registry: Subcommand.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder //
          .setName(this.name)
          .setDescription(this.description)
          .addSubcommandGroup((builder) =>
            builder //
              .setName('config')
              .setDescription('Configures the bot')
              .addSubcommand((builder) =>
                builder //
                  .setName('edit')
                  .setDescription('Edits the configuration')
              )
              .addSubcommand((builder) =>
                builder //
                  .setName('show')
                  .setDescription('Shows the configuration')
              )
              .addSubcommand((builder) =>
                builder //
                  .setName('remove')
                  .setDescription('Removes the configuration')
              )
              .addSubcommand((builder) =>
                builder //
                  .setName('reset')
                  .setDescription('Resets the configuration')
              )
          ),
      { guildIds: ['838895946397646850'] }
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
