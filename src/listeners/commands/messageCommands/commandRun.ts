import { ApplyOptions } from '@sapphire/decorators';
import type { ListenerOptions } from '@sapphire/framework';
import { Events, Listener } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCommandRun
})
export class UserEvent extends Listener<typeof Events.MessageCommandRun> {
  public run() {
    this.container.logger.debug('Command Run triggered');
  }
}
