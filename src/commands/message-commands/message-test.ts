import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { Command } from '@sapphire/framework';
import { ButtonStyle, ComponentType, EmbedBuilder, Message } from 'discord.js';

export class UserCommand extends Command {
  public constructor(context: Command.Context) {
    super(context, {
      description: 'malleable test command'
    });
  }
  public override async messageRun(message: Message) {
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
