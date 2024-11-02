import { Subcommand } from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

export class UserCommand extends Subcommand {
  public constructor(context: Subcommand.LoaderContext) {
    super(context, {
      aliases: ['sg'],
      description: 'A message command with some subcommand groups',
      subcommands: [
        {
          type: 'group',
          name: 'config',
          entries: [
            { name: 'edit', messageRun: 'configEdit', preconditions: ['NSFW'] },
            { name: 'show', messageRun: 'configShow', default: true },
            { name: 'remove', messageRun: 'configRemove' },
            { name: 'reset', messageRun: 'configReset' }
          ]
        }
      ]
    });
  }
  public async configShow(message: Message) {
    if (!message.channel.isSendable()) return;

    return message.channel.send('Showing!');
  }

  public async configEdit(message: Message) {
    if (!message.channel.isSendable()) return;

    return message.channel.send('Editing!');
  }

  public async configRemove(message: Message) {
    if (!message.channel.isSendable()) return;

    return message.channel.send('Removing!');
  }

  public async configReset(message: Message) {
    if (!message.channel.isSendable()) return;

    return message.channel.send('Resetting!');
  }
}
