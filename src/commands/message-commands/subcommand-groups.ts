import { Subcommand } from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

export class UserCommand extends Subcommand {
  public constructor(context: Subcommand.Context) {
    super(context, {
      aliases: ['sg'],
      description: 'A message command command with some subcommand groups',
      subcommands: [
        {
          type: 'group',
          name: 'config',
          entries: [
            { name: 'edit', messageRun: 'configEdit' },
            { name: 'show', messageRun: 'configShow', default: true },
            { name: 'remove', messageRun: 'configRemove' },
            { name: 'reset', messageRun: 'configReset' }
          ]
        }
      ]
    });
  }
  public async configShow(message: Message) {
    return message.channel.send('Showing!');
  }

  public async configEdit(message: Message) {
    return message.channel.send('Editing!');
  }

  public async configRemove(message: Message) {
    return message.channel.send('Removing!');
  }

  public async configReset(message: Message) {
    return message.channel.send('Resetting!');
  }
}
