import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	description: 'ping pong'
})
export class UserCommand extends Command {
	public async run(_message: Message, args: Args) {
        const result = await args.pickResult('guildCategoryChannel');

        return console.log(result);
	}
}
