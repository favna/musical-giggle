import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
  description: 'required args'
})
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    if (args.finished) {
      return message.channel.send("Hey you didn't give me any arguments");
    }

    const allArgs = await args.rest('string');

    return message.channel.send(`all provided args are: ${allArgs}`);
  }
}
