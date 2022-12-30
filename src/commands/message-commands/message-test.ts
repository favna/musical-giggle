import { ApplyOptions } from '@sapphire/decorators';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { Command, CommandOptions } from '@sapphire/framework';
import { ButtonStyle, ComponentType, EmbedBuilder, Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
  description: 'malleable test command'
})
export class UserCommand extends Command {
  public async messageRun(message: Message) {
    const paginationEmbed = new PaginatedMessage({
      template: new EmbedBuilder() //
        .setColor('Blue')
        .setTitle(`Hi`)
        .setFooter({ text: 'Hi' })
    });

    paginationEmbed //
      .addPageEmbed((embed) => embed.setDescription('Hi'))
      .addPageEmbed((embed) => embed.setDescription('Hello'));

    paginationEmbed.addAction({
      type: ComponentType.Button,
      customId: 'Ban',
      emoji: '🔨',
      style: ButtonStyle.Primary,
      run: async () => console.log('hi')
    });

    return paginationEmbed.run(message, message.author);
  }
}
