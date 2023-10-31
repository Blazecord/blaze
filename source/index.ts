import './lib/setup';
import 'dotenv/config';

import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

const dev = process.env.NODE_ENV ? process.env.NODE_ENV === 'development' : false;

export default new SapphireClient({
	logger: {
		level: dev ? LogLevel.Debug : LogLevel.Info
	},
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.MessageContent
	],
	loadMessageCommandListeners: true,
	api: {
		listenOptions: {
			port: 4000,
		},
		origin: '*',
		// prefix: `/api/v${version}/`,
	}
}).login();
