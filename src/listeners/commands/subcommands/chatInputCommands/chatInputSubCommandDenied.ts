import { Listener, UserError } from '@sapphire/framework';
import { SubcommandPluginEvents, type ChatInputSubcommandDeniedPayload } from '@sapphire/plugin-subcommands';

export class UserListener extends Listener<typeof SubcommandPluginEvents.ChatInputSubcommandDenied> {
  public constructor(context: Listener.Context) {
    super(context, {
      event: SubcommandPluginEvents.ChatInputSubcommandDenied
    });
  }

  public run({ message: content }: UserError, { interaction }: ChatInputSubcommandDeniedPayload) {
    return interaction.reply({
      content,
      allowedMentions: { users: [interaction.user.id], roles: [] },
      ephemeral: true
    });
  }
}
