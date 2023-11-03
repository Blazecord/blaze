import { EmbedBuilder, GuildBan, TextChannel } from 'discord.js';

import { Events, Listener } from '@sapphire/framework';

import { Logging } from '../prisma';
import { formatDiscordTimestamp } from '../lib';

export class GuildBanRemove extends Listener {
    private logging: Logging;

    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...context,
            event: Events.GuildBanRemove
        })

        this.logging = new Logging();
    }

    public async run(ban: GuildBan) {
        const loggingData = await this.logging.get(ban.guild.id!);

        if (!loggingData) return;

        const channel = await ban.guild?.channels.cache.get(loggingData.channelId);

        if (!channel) return;

        const embed = new EmbedBuilder()
            .setColor('#802e2e')
            .setAuthor({ name: 'Guild Ban Remove', iconURL: this.container.client.user?.displayAvatarURL() })
            .addFields([
                { name: 'Who?', value: `>>> ${ban.user?.tag ?? 'Unknown'}` },
                { name: 'Reason', value: '>>> ' + (ban.reason ?? 'Unknown') },
                { name: 'Created At', value: `>>> ${formatDiscordTimestamp(ban.user?.createdAt!, 'R')}` }
            ])
            .setTimestamp(new Date())
            .setFooter({ text: 'Logging-Module: banRemove' });

        try {
            (channel as TextChannel).send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    }
}