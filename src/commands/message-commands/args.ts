import { Command, type Args } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class UserCommand extends Command {
  public constructor(context: Command.Context) {
    super(context, {
      description: 'required args'
    });
  }

  public override async messageRun(message: Message, args: Args) {
    if (args.finished) {
      return message.channel.send("Hey you didn't give me any arguments");
    }

    const allArgs = await args.rest('string');

    return message.channel.send(`all provided args are: ${allArgs}`);
  }
}
