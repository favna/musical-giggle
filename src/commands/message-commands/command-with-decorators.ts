import { RequiresClientPermissions } from '@sapphire/decorators';
import { send } from '@sapphire/plugin-editable-commands';
import { Subcommand } from '@sapphire/plugin-subcommands';
import { EmbedBuilder, PermissionFlagsBits, type Message } from 'discord.js';

export class UserCommand extends Subcommand {
  public constructor(context: Subcommand.LoaderContext) {
    super(context, {
      aliases: ['cwd'],
      description: 'A basic message command with some subcommands',
      subcommands: [
        {
          name: 'add',
          messageRun: 'add',
          preconditions: ['NSFW']
        },
        {
          name: 'create',
          messageRun: 'add'
        },
        {
          name: 'remove',
          messageRun: 'remove'
        },
        {
          name: 'reset',
          messageRun: 'reset'
        },
        {
          name: 'show',
          messageRun: 'show'
        }
      ]
    });
  }

  // Anyone should be able to view the result, but not modify
  public async show(message: Message) {
    return send(message, 'Showing!');
  }

  @RequiresClientPermissions(PermissionFlagsBits.ManageChannels)
  public async add(message: Message) {
    const embed = new EmbedBuilder() //
      .setColor('#3986E4')
      .setDescription('Added!')
      .setTitle('Configuration Log')
      .setTimestamp();

    return send(message, { embeds: [embed] });
  }

  public async remove(message: Message) {
    return send(message, 'Removing!');
  }

  public async reset(message: Message) {
    return send(message, 'Resetting!');
  }
}
