import './lib/setup.js';

import { LogLevel, SapphireClient } from '@sapphire/framework';
import { Time } from '@sapphire/time-utilities';
import { envParseArray } from '@skyra/env-utilities';
import { GatewayIntentBits } from 'discord.js';

const client = new SapphireClient({
  defaultPrefix: 'dr!',
  caseInsensitiveCommands: true,
  caseInsensitivePrefixes: true,
  loadDefaultErrorListeners: true,
  loadMessageCommandListeners: true,
  loadSubcommandErrorListeners: true,
  subcommandDefaultCooldown: {
    limit: 1,
    delay: Time.Second * 5
  },
  defaultCooldown: {
    limit: 1,
    delay: Time.Second * 5,
    filteredUsers: envParseArray('OWNERS')
  },
  logger: {
    level: LogLevel.Debug
  },
  api: {
    listenOptions: {
      port: 6000
    }
  },
  shards: 'auto',
  intents: [
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});

const main = async () => {
  try {
    client.logger.info('Logging in');
    await client.login();
    client.logger.info('logged in');
  } catch (error) {
    client.logger.fatal(error);
    client.destroy();
    process.exit(1);
  }
};

main();
