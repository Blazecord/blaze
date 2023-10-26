import { PrismaClient } from '@prisma/client';

import { redis } from '../../lib';

export enum Language {
    EN = 'EN',
    DE = 'DE'
}

export class GuildSettings {
    private client: PrismaClient;
    
    constructor() {
        this.client = new PrismaClient();
    }

    /**
     * Gets Guild Settings from the Database
     * @param guildId The guild Id
     * @returns any
     */
    public async get(guildId: string) {
        return await this.client.guildSettings.findFirst(
            {
                where: {
                    guildId: guildId
                }
            }
        )
    }

    /**
     * Adds Guild Settings to the Database
     * @param guildId The guild Id
     * @param language The language
     * @returns 
     */
    public async set(guildId: string, language: Language): Promise<void> {
        const result = await redis.get(`GUILD_SETTINGS_${guildId}`);

        if (result) {
            await redis.del(`GUILD_SETTINGS_${guildId}`);
            
            await this.client.guildSettings.update(
                {
                    where: {
                        guildId: guildId
                    },
                    data: {
                        language: language
                    }
                }
            )

            await redis.set(`GUILD_SETTINGS_${guildId}`, JSON.stringify({ guildId: guildId, language: language }), 'EX', 180);

            return
        } else {
            await this.client.guildSettings.create(
                {
                    data: {
                        guildId: guildId,
                        language: language
                    }
                }
            )

            await redis.set(`GUILD_SETTINGS_${guildId}`, JSON.stringify({ guildId: guildId, language: language }), 'EX', 180);

            return
        }
    }

    /**
     * Updates Guild Settings in the Database
     * @param guildId The guild Id
     * @param language The new language
     * @returns void
     */
    public async update(guildId: string, language: Language): Promise<void> {
        const result = await redis.get(`GUILD_SETTINGS_${guildId}`);

        if (result) {
            await redis.del(`GUILD_SETTINGS_${guildId}`);

            await this.client.guildSettings.update(
                {
                    where: {
                        guildId: guildId
                    },
                    data: {
                        language: language
                    }
                }
            )

            await redis.set(`GUILD_SETTINGS_${guildId}`, JSON.stringify({ guildId: guildId, language: language }), 'EX', 180);

            return
        } else if (!result) {
            await this.client.guildSettings.update(
                {
                    where: {
                        guildId: guildId
                    },
                    data: {
                        language: language
                    }
                }
            )

            await redis.set(`GUILD_SETTINGS_${guildId}`, JSON.stringify({ guildId: guildId, language: language }), 'EX', 180);

            return
        }
    }

    /**
     * Deletes Guild Settings from the Database
     * @param guildId The guild Id
     * @returns void
     */
    public async delete(guildId: string): Promise<void> {
        const result = await redis.get(`GUILD_SETTINGS_${guildId}`);

        if (result) {
            await redis.del(`GUILD_SETTINGS_${guildId}`);

            await this.client.guildSettings.delete(
                {
                    where: {
                        guildId: guildId
                    }
                }
            )

            return
        } else if (!result) {
            await this.client.guildSettings.delete(
                {
                    where: {
                        guildId: guildId
                    }
                }
            )

            return
        }
    }

    /**
     * Checks Guild Settings are in the Database for the Guild
     * @param guildId The guild Id
     * @returns boolean
     */
    public async exists(guildId: string): Promise<boolean> {
        const result = await this.client.guildSettings.findFirst(
            {
                where: {
                    guildId: guildId
                }
            }
        )

        if (result) {
            return true;
        } else {
            return false;
        }
    }
}
