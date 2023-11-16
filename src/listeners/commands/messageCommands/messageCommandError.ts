import { Events, Listener } from '@sapphire/framework';

export class UserEvent extends Listener<typeof Events.MessageCommandError> {
  public constructor(context: Listener.LoaderContext) {
    super(context, {
      event: Events.MessageCommandError
    });
  }

  public run() {
    this.container.logger.debug('Command Error triggered');
  }
}
