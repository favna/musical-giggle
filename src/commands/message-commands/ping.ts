import { Enumerable, EnumerableMethod } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';

export class UserCommand extends Command {
  @Enumerable(false)
  public dev = 'hottetottetentententoonstelling';

  @EnumerableMethod(true)
  private getDev() {
    return this.dev;
  }

  public constructor(context: Command.LoaderContext) {
    super(context, {
      description: 'ping pong'
    });
  }
  public override async messageRun(message: Message) {
    const msg = await send(message, 'Ping?');

    const content = `Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${
      (msg.editedTimestamp ?? msg.createdTimestamp) - (message.editedTimestamp ?? message.createdTimestamp)
    }ms. ${this.getDev()}`;

    return send(message, content);
  }
}
