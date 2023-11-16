import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { Command } from '@sapphire/framework';
import { ButtonStyle, ComponentType, EmbedBuilder, type Message } from 'discord.js';

export class UserCommand extends Command {
  public constructor(context: Command.LoaderContext) {
    super(context, {
      aliases: ['pm'],
      description: 'A message command that uses paginated messages.',
      generateDashLessAliases: true
    });
  }
  public override async messageRun(message: Message) {
    const display = new PaginatedMessage({
      template: new EmbedBuilder()
        .setFooter({ text: 'footer', iconURL: message.author.displayAvatarURL() })
        .setColor('Red')
        .setAuthor({ name: `Moderation history for Favna#0001`, iconURL: message.author.displayAvatarURL() })
        .setTimestamp()
    })
      .setActions(
        [
          {
            style: ButtonStyle.Link,
            label: 'Sapphire Website',
            emoji: '🔷',
            url: 'https://sapphirejs.dev',
            type: ComponentType.Button
          }
        ],
        true
      )
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
