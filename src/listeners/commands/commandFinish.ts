import { ApplyOptions } from '@sapphire/decorators';
import type { ListenerOptions } from '@sapphire/framework';
import { Events, Listener } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCommandFinish
})
export class UserEvent extends Listener<typeof Events.MessageCommandFinish> {
  public run() {
    this.container.logger.debug('Command Finish triggered');
  }
}
