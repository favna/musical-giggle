import { ApplyOptions } from '@sapphire/decorators';
import type { ListenerOptions } from '@sapphire/framework';
import { Events, Listener } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
  event: Events.CommandError
})
export class UserEvent extends Listener<typeof Events.CommandError> {
  public run() {
    this.container.logger.debug('Command Error triggered');
  }
}
