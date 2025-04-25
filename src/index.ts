import './lib/setup.js';

import { LogLevel, SapphireClient } from '@sapphire/framework';
import { Time } from '@sapphire/time-utilities';
import { GatewayIntentBits, OAuth2Scopes } from 'discord.js';

const client = new SapphireClient({
  defaultPrefix: 'dr!',
  caseInsensitiveCommands: true,
  caseInsensitivePrefixes: true,
  loadDefaultErrorListeners: true,
  loadMessageCommandListeners: true,
  loadSubcommandErrorListeners: true,
  api: {
    prefix: '/api/',
    origin: '*',
    automaticallyConnect: true,
    auth: {
      id: 'auth_id',
      secret: 'auth_secret',
      cookie: 'SAPPHIRE_AUTH',
      redirect: 'redirect_uri',
      scopes: [OAuth2Scopes.Identify, OAuth2Scopes.Guilds],
      domainOverwrite: process.env.NODE_ENV === 'development' ? '127.0.0.1' : undefined
    },
    listenOptions: { port: 3000 }
  },
  subcommandDefaultCooldown: { limit: 1, delay: Time.Second * 5 },
  defaultCooldown: { limit: 1, delay: Time.Second * 5 },
  logger: { level: LogLevel.Debug },
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
