import { ApplyOptions } from '@sapphire/decorators';
import { Subcommand } from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

@ApplyOptions<Subcommand.Options>({
  aliases: ['cws'],
  description: 'A basic command with some subcommands',
  subcommands: [
    {
      name: 'add',
      messageRun: 'add'
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
      messageRun: 'show',
      default: true
    }
  ]
})
export class UserCommand extends Subcommand {
  public async show(message: Message) {
    return message.channel.send('Showing!');
  }

  public async add(message: Message) {
    return message.channel.send('Adding!');
  }

  public async remove(message: Message) {
    return message.channel.send('Removing!');
  }

  public async reset(message: Message) {
    return message.channel.send('Resetting!');
  }
}
