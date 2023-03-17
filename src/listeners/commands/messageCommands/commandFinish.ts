import { Events, Listener } from '@sapphire/framework';

export class UserEvent extends Listener<typeof Events.MessageCommandFinish> {
  public constructor(context: Listener.Context) {
    super(context, {
      event: Events.MessageCommandFinish
    });
  }
  public run() {
    this.container.logger.debug('Command Finish triggered');
  }
}
