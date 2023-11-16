import { Events, Listener } from '@sapphire/framework';

export class UserEvent extends Listener<typeof Events.MessageCommandRun> {
  public constructor(context: Listener.LoaderContext) {
    super(context, {
      event: Events.MessageCommandRun
    });
  }

  public run() {
    this.container.logger.debug('Command Run triggered');
  }
}
