import { ApplyOptions } from '@sapphire/decorators';
import { CommandDeniedPayload, Events, Listener, ListenerOptions, UserError } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
  event: Events.CommandDenied
})
export class UserEvent extends Listener<typeof Events.CommandDenied> {
  public async run({ context, message: content }: UserError, { message }: CommandDeniedPayload) {
    // `context: { silent: true }` should make UserError silent:
    // Use cases for this are for example permissions error when running the `eval` command.
    if (Reflect.get(Object(context), 'silent')) return;

    return message.channel.send({ content, allowedMentions: { users: [message.author.id], roles: [] } });
  }
}
