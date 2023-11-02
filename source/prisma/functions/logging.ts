import { PrismaClient } from '@prisma/client';

import { redis } from '../../lib';

export class Logging {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async get(guildId: string) {
        return await this.prisma.logSettings.findFirst(
            {
                where: {
                    guildId: guildId
                }
            }
        )
    }

    public async set(guildId: string, channelId: string) {
        const redisData = await redis.get(`LOGGING_${guildId}`);

        if (redisData) {
            await redis.del(guildId);
        }

        const data = await this.prisma.logSettings.findFirst(
            {
                where: {
                    guildId: guildId
                }
            }
        )

        if (data) {
            await this.prisma.logSettings.update(
                {
                    where: {
                        guildId: guildId
                    },
                    data: {
                        guildId: guildId,
                        channelId: channelId
                    }
                }
            )

            await redis.set(`LOGGING_${guildId}`, channelId, 'EX', 180);
        } else if (!data) {
            await this.prisma.logSettings.create(
                {
                    data: {
                        guildId: guildId,
                        channelId: channelId
                    }
                }
            )

            await redis.set(`LOGGING_${guildId}`, channelId, 'EX', 180);
        }
    }

    public async delete(guildId: string) {
        const redisData = await redis.get(`LOGGING_${guildId}`);

        if (redisData) {
            await redis.del(guildId);
        }

        const data = await this.get(guildId);

        if (data) {
            await this.prisma.logSettings.delete(
                {
                    where: {
                        guildId: guildId
                    }
                }
            )
        }
    }
}