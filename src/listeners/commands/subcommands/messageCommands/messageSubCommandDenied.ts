import { Listener, UserError } from '@sapphire/framework';
import { SubcommandPluginEvents, type MessageSubcommandDeniedPayload } from '@sapphire/plugin-subcommands';

export class UserEvent extends Listener<typeof SubcommandPluginEvents.MessageSubCommandDenied> {
  public constructor(context: Listener.Context) {
    super(context, {
      event: SubcommandPluginEvents.MessageSubCommandDenied
    });
  }

  public async run({ context, message: content }: UserError, { message }: MessageSubcommandDeniedPayload) {
    // `context: { silent: true }` should make UserError silent:
    // Use cases for this are for example permissions error when running the `eval` command.
    if (Reflect.get(Object(context), 'silent')) return;

    return message.channel.send({ content, allowedMentions: { users: [message.author.id], roles: [] } });
  }
}
