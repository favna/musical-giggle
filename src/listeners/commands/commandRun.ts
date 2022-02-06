import { ApplyOptions } from '@sapphire/decorators';
import type { ListenerOptions } from '@sapphire/framework';
import { Events, Listener } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
  event: Events.CommandRun
})
export class UserEvent extends Listener<typeof Events.CommandRun> {
  public run() {
    this.container.logger.debug('Command Run triggered');
  }
}
