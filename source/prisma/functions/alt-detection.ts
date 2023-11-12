import { PrismaClient } from "@prisma/client";

import { redis } from '../../lib';

export enum AltDetectionAge {
    NONE = "NONE",
    ONE_DAY = "ONE_DAY",
    ONE_WEEK = "ONE_WEEK",
    ONE_MONTH = "ONE_MONTH",
}

export class AltDetection {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    /**
     * 
     * @param guildId The guildId of the Discord Guild
     * @returns The age of the Discord account and the Natural Language Processing setting.
     */
    public async get(guildId: string) {
        return await this.prisma.altDetectorSettings.findFirst(
            {
                where: {
                    guildId: guildId
                }
            }
        )
    }

    /**
     * Sets the age, Natural Language Processing setting, and the guildId of the Discord Guild.
     * @param guildId The guildId of the Discord Guild
     * @param age The minimum age of the Discord account
     * @param nlp Whether or not to use Natural Language Processing
     */
    public async set(guildId: string, age: any, nlp?: boolean) {
        const redisData = await redis.get(`ALT_DETECTION_${guildId}`);

        if (redisData) {
            await redis.del(`ALT_DETECTION_${guildId}`);
            const data = await this.get(guildId);

            if (data) {
                await this.prisma.altDetectorSettings.update(
                    {
                        where: {
                            guildId: guildId
                        },
                        data: {
                            guildId: guildId,
                            age: age,
                            nlp: nlp // Natural Language Processing
                        }
                    }
                )
                
                await redis.set(`ALT_DETECTION_${guildId}`, JSON.stringify(age), 'EX', 180);
            } else if (!data) {
                await this.prisma.altDetectorSettings.create(
                    {
                        data: {
                            guildId: guildId,
                            age: age,
                            nlp: nlp // Natural Language Processing
                        }
                    }
                )

                await redis.set(`ALT_DETECTION_${guildId}`, JSON.stringify(age), 'EX', 180);
            }
        } else if (!redisData) {
            const data = await this.get(guildId);

            if (data) {
                await this.prisma.altDetectorSettings.update(
                    {
                        where: {
                            guildId: guildId
                        },
                        data: {
                            guildId: guildId,
                            age: age,
                            nlp: nlp // Natural Language Processing
                        }
                    }
                )

                await redis.set(`ALT_DETECTION_${guildId}`, JSON.stringify(age), 'EX', 180);
            } else if (!data) {
                await this.prisma.altDetectorSettings.create(
                    {
                        data: {
                            guildId: guildId,
                            age: age,
                            nlp: nlp // Natural Language Processing
                        }
                    }
                )

                await redis.set(`ALT_DETECTION_${guildId}`, JSON.stringify(age), 'EX', 180);
            }
        }
    }

    public async delete(guildId: string) {
        const redisData = await redis.get(`ALT_DETECTION_${guildId}`);

        if (redisData) {
            await redis.del(`ALT_DETECTION_${guildId}`);
            await this.prisma.altDetectorSettings.delete(
                {
                    where: {
                        guildId: guildId
                    }
                }
            )
        } else if (!redisData) {
            await this.prisma.altDetectorSettings.delete(
                {
                    where: {
                        guildId: guildId
                    }
                }
            )
        }
    }
}