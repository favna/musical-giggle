import { Events, Listener, UserError, type ChatInputCommandDeniedPayload } from '@sapphire/framework';

export class UserListener extends Listener<typeof Events.ChatInputCommandDenied> {
  public constructor(context: Listener.LoaderContext) {
    super(context, {
      event: Events.ChatInputCommandDenied
    });
  }

  public run({ message: content }: UserError, { interaction }: ChatInputCommandDeniedPayload) {
    return interaction.reply({
      content,
      allowedMentions: { users: [interaction.user.id], roles: [] },
      ephemeral: true
    });
  }
}
