import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, LogLevel, type ChatInputCommandSuccessPayload, type Command } from '@sapphire/framework';
import type { Logger } from '@sapphire/plugin-logger';
import { cyan } from 'colorette';
import type { APIUser } from 'discord-api-types/v9';
import type { Guild, User } from 'discord.js';

@ApplyOptions<Listener.Options>({ event: Events.ChatInputCommandSuccess })
export class UserListener extends Listener {
  public override run(payload: ChatInputCommandSuccessPayload) {
    const { author, commandName, sentAt, shard, runtime } = getSuccessLoggerData(payload);
    this.container.logger.debug(`${shard} - ${commandName} ${author} ${sentAt} (${runtime})`);
  }

  public override onLoad() {
    this.enabled = (this.container.logger as Logger).level <= LogLevel.Debug;
    return super.onLoad();
  }
}

function getSuccessLoggerData({ interaction, command, duration }: ChatInputCommandSuccessPayload) {
  const shard = getShardInfo(interaction.guild?.shardId ?? 0);
  const commandName = getCommandInfo(command);
  const author = getAuthorInfo(interaction.user);
  const sentAt = interaction.guild ? getGuildInfo(interaction.guild) : '';
  const runtime = getDuration(duration);

  return { shard, commandName, author, sentAt, runtime };
}

function getShardInfo(id: number) {
  return `[${cyan(id.toString())}]`;
}

function getCommandInfo(command: Command) {
  return cyan(command.name);
}

function getAuthorInfo(author: User | APIUser) {
  return `${author.username}[${cyan(author.id)}]`;
}

function getGuildInfo(guild: Guild) {
  return `${guild.name}[${cyan(guild.id)}]`;
}

function getDuration(duration: number) {
  if (duration >= 1000) return `${(duration / 1000).toFixed(2)}s`;
  if (duration >= 1) return `${duration.toFixed(2)}ms`;
  return `${(duration * 1000).toFixed(2)}μs`;
}
