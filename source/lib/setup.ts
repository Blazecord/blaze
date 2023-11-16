// Unless explicitly defined, set NODE_ENV as development:
process.env.NODE_ENV ??= 'development'; // TODO: Remove this line when deploying to production

import '@sapphire/plugin-logger/register';

import * as colorette from 'colorette';
import { join } from 'node:path';
import { rootDir } from './constants.js';

import { ApplicationCommandRegistries, RegisterBehavior } from '@sapphire/framework';
import { setup } from '@skyra/env-utilities';

// Set default behavior to bulk overwrite
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);

// Read env var
setup({ path: join(rootDir, '.env') });

// Enable colorette
colorette.createColors({ useColor: true });
