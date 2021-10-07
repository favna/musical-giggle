import { ApplyOptions } from '@sapphire/decorators';
import type { ListenerOptions } from '@sapphire/framework';
import { Events, Listener } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
	event: Events.CommandFinish
})
export class UserEvent extends Listener<typeof Events.CommandFinish> {
	public run() {
		this.container.logger.debug('Command Finish triggered');
	}
}
