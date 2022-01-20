import { ApplyOptions } from '@sapphire/decorators';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { Command, CommandOptions } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';

@ApplyOptions<CommandOptions>({
	aliases: ['pm'],
	description: 'A command that uses paginated messages.',
	generateDashLessAliases: true
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const display = new PaginatedMessage({
			template: new MessageEmbed()
				.setFooter({ text: '', iconURL: message.author.displayAvatarURL({ dynamic: true }) })
				.setColor('RANDOM')
				.setAuthor({ name: `Moderation history for Favna#0001`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
				.setTimestamp()
		})
			.addPageEmbed((embed) =>
				embed //
					.setDescription('This is the first page')
					.setTitle('Page 1')
			)
			.addPageEmbed((embed) =>
				embed //
					.setDescription('This is the second page')
					.setTitle('Page 2')
			)
			.addPageEmbed((embed) =>
				embed //
					.setDescription('This is the third page')
					.setTitle('Page 3')
			)
			.addPageEmbeds((embed1, embed2) => [
				embed1 //
					.setDescription('This is the fourth page - embed 1')
					.setTitle('Page 4.1'),
				embed2 //
					.setDescription('This is the fourth page - embed 2')
					.setTitle('Page 4.2')
			]);

		return display.run(message);
	}
}
