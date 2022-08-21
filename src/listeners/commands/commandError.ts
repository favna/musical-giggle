import { ApplyOptions } from '@sapphire/decorators';
import type { ListenerOptions } from '@sapphire/framework';
import { Events, Listener } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCommandError
})
export class UserEvent extends Listener<typeof Events.MessageCommandError> {
  public run() {
    this.container.logger.debug('Command Error triggered');
  }
}
