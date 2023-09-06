// Unless explicitly defined, set NODE_ENV as development:
process.env.NODE_ENV ??= 'development';

import { ApplicationCommandRegistries, RegisterBehavior } from '@sapphire/framework';
import '@sapphire/plugin-api/register';
import '@sapphire/plugin-editable-commands/register';
import '@sapphire/plugin-logger/register';
import { setup, type ArrayString } from '@skyra/env-utilities';
import * as colorette from 'colorette';
import { inspect } from 'node:util';
import { srcDir } from './constants.js';

// Read env var
setup({ path: new URL('.env', srcDir) });

// Set default inspection depth
inspect.defaultOptions.depth = 1;

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
ApplicationCommandRegistries.setDefaultGuildIds(['838895946397646850']);

// Enable colorette
colorette.createColors({ useColor: true });

declare module '@skyra/env-utilities' {
  interface Env {
    OWNERS: ArrayString;
  }
}
