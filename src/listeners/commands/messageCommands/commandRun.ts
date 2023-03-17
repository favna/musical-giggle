import { Events, Listener } from '@sapphire/framework';

export class UserEvent extends Listener<typeof Events.MessageCommandRun> {
  public constructor(context: Listener.Context) {
    super(context, {
      event: Events.MessageCommandRun
    });
  }
  public run() {
    this.container.logger.debug('Command Run triggered');
  }
}
