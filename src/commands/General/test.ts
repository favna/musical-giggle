import { ApplyOptions } from '@sapphire/decorators';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { Command, CommandOptions } from '@sapphire/framework';
import { Constants, Message, MessageEmbed } from 'discord.js';

@ApplyOptions<CommandOptions>({
	description: 'ping pong'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const paginationEmbed = new PaginatedMessage({
			template: new MessageEmbed() //
				.setColor('BLUE')
				.setTitle(`Hi`)
				.setFooter('Hi')
		});

		paginationEmbed //
			.addPageEmbed((embed) => embed.setDescription('Hi'))
			.addPageEmbed((embed) => embed.setDescription('Hello'));

		paginationEmbed.addAction({
			type: Constants.MessageComponentTypes.BUTTON,
			customId: 'Ban',
			emoji: "🔨",
			style: 'PRIMARY',
			run: async () => console.log('hi')
		});

		return paginationEmbed.run(message, message.author);
	}
}
