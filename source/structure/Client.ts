import '../lib/setup';
import 'dotenv/config';

import { ActivityType, GatewayIntentBits, Options } from "discord.js";
import { LogLevel, SapphireClient } from "@sapphire/framework";

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
                api: {
                    listenOptions: {
                        port: Number(process.env.PORT)
                    },
                    // prefix: `/api/v${version}/`,
                },
                loadMessageCommandListeners: true,
            }
        )
        this.init()
    }

    private init() {
        this.emit('start', this)

        this.login(process.env.DISCORD_TOKEN)
    }
}