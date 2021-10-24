import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import { send } from '@skyra/editable-commands';
import type { Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { PaginatedMessage } from '../../lib/PaginatedMessage/PaginatedMessage';

@ApplyOptions<CommandOptions>({
	aliases: ['pm'],
	description: 'A command that uses paginated messages.',
	generateDashLessAliases: true
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const response = await send(message, 'loading...');

		const paginatedMessage = new PaginatedMessage({
			template: new MessageEmbed()
				.setColor('#FF0000')
				// Be sure to add a space so this is offset from the page numbers!
				.setFooter(' footer after page numbers')
		});

		paginatedMessage
			.setSelectMenuOptions((pageIndex) => ({ label: `Go to page ${pageIndex}` }))
			.addPageContent('Page 1')
			.addPageContent('Page 2')
			.addPageContent('Page 3')
			.addPageContent('Page 4')
			.addPageContent('Page 5')
			.addPageContent('Page 6')
			.addPageContent('Page 7')
			.addPageContent('Page 8')
			.addPageContent('Page 9')
			.addPageContent('Page 10')
			.addPageContent('Page 11')
			.addPageContent('Page 12')
			.addPageContent('Page 13')
			.addPageContent('Page 14')
			.addPageContent('Page 15')
			.addPageContent('Page 16')
			.addPageContent('Page 17')
			.addPageContent('Page 18')
			.addPageContent('Page 19')
			.addPageContent('Page 20')
			.addPageContent('Page 21')
			.addPageContent('Page 22')
			.addPageContent('Page 23')
			.addPageContent('Page 24')
			.addPageContent('Page 25')
			.addPageContent('Page 26')
			.addPageContent('Page 27')
			.addPageContent('Page 28')
			.addPageContent('Page 29')
			.addPageContent('Page 30')
			.addPageContent('Page 31')
			.addPageContent('Page 32')
			.addPageContent('Page 33')
			.addPageContent('Page 34')
			.addPageContent('Page 35')
			.addPageContent('Page 36')
			.addPageContent('Page 37');

		await paginatedMessage.run(response, message.author);
		return response;
	}
}
