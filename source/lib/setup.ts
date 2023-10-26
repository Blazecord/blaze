// Unless explicitly defined, set NODE_ENV as development:
process.env.NODE_ENV ??= 'development';

import { ApplicationCommandRegistries, RegisterBehavior } from '@sapphire/framework';
import '@sapphire/plugin-logger/register';
import { setup } from '@skyra/env-utilities';
import * as colorette from 'colorette';
import { join } from 'node:path';

// Set default behavior to bulk overwrite
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.Overwrite);

// Read env var
setup({ path: join('.', '.env') });

// Enable colorette
colorette.createColors({ useColor: true });
