import { ApplyOptions } from '@sapphire/decorators';
import { PatternCommand } from '../lib/pattern-commands/src';
import type { Message } from 'discord.js';

@ApplyOptions<PatternCommand.Options>({
	aliases: ['kyra', 'postman'],
	chance: 100
})
export class AwooCommand extends PatternCommand {
	public messageRun(message: Message) {
		message.reply('is gay');
	}
}
