import { Events, Listener, UserError, type ChatInputCommandDeniedPayload } from '@sapphire/framework';

export class UserListener extends Listener<typeof Events.ChatInputCommandDenied> {
  public constructor(context: Listener.Context) {
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
