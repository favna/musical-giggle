import { ApplyOptions } from '@sapphire/decorators';
import type { Message } from 'discord.js';
import { PatternCommand } from '../lib/patternCommands';

@ApplyOptions<PatternCommand.Options>({
	aliases: ['kyra', 'postman'],
	chance: 100
})
export class AwooCommand extends PatternCommand {
	public messageRun(message: Message) {
		message.reply('is gay');
	}
}
