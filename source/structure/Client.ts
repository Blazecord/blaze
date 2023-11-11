import '../lib/setup.js';
import 'dotenv/config';

import { ActivityType, GatewayIntentBits, Options } from "discord.js";
import { LogLevel, SapphireClient } from "@sapphire/framework";

import { WSServer } from './WebSocket.js';
import { Server } from './Server.js';

const dev = process.env.NODE_ENV ? process.env.NODE_ENV === 'development' : false;

export class Blaze extends SapphireClient {
    constructor() {
        super(
            {
                logger: {
                    level: dev ? LogLevel.Debug : LogLevel.Info
                },
                intents: [
                    GatewayIntentBits.DirectMessages,
                    GatewayIntentBits.GuildMessages,
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildMembers,
                    GatewayIntentBits.GuildInvites,
                    GatewayIntentBits.MessageContent,
                    GatewayIntentBits.GuildModeration,
                    GatewayIntentBits.GuildMessageReactions,
                    GatewayIntentBits.GuildVoiceStates,
                ],
                makeCache: Options.cacheWithLimits(
                    {
                        MessageManager: {
                            maxSize: 50,
                        },
                        GuildBanManager: {
                            maxSize: 200
                        },
                        UserManager: {
                            maxSize: 200
                        },
                    },
                ),
                presence: {
                    status: 'dnd',
                    activities: [
                        {
                            name: 'Booting up...',
                            type: ActivityType.Playing,
                        },
                    ]
                },
                loadMessageCommandListeners: true,
            }
        )
        this.init()
    }

    private init() {
        this.emit('start', this)

        const wsserver = new WSServer()
        const httpServer = new Server()

        wsserver.run()
        httpServer.run()

        this.login(process.env.DISCORD_TOKEN)
    }
}