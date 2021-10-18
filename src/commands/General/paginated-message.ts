import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { PaginatedMessage } from '../../lib/PaginatedMessage';
import { sendLoadingMessage } from '../../lib/utils';

@ApplyOptions<CommandOptions>({
	aliases: ['pm'],
	description: 'A command that uses paginated messages.',
	generateDashLessAliases: true
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const response = await sendLoadingMessage(message);

		const paginatedMessage = new PaginatedMessage({
			template: new MessageEmbed()
				.setColor('#FF0000')
				// Be sure to add a space so this is offset from the page numbers!
				.setFooter(' footer after page numbers')
		});

		paginatedMessage
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

		await paginatedMessage.run(response, message.author);
		return response;
	}
}
