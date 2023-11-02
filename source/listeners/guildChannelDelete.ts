import { EmbedBuilder, GuildChannel, TextChannel } from 'discord.js';

import { Events, Listener } from '@sapphire/framework';

import { Logging } from '../prisma';
import { formatDiscordTimestamp } from '../lib';

export class GuildChannelDelete extends Listener {
	private logging: Logging;

	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, {
			...options,
			event: Events.ChannelDelete
		});

		this.logging = new Logging();
	}

	public async run(channel: GuildChannel) {
		const loggingData = await this.logging.get(channel.guild.id!);

		if (!loggingData) return;

		const sendChannel = await channel.guild?.channels.cache.get(loggingData.channelId);

		if (!channel) return;

		const embed = new EmbedBuilder()
			.setColor('#802e2e')
			.setAuthor({ name: 'Guild Channel Delete', iconURL: this.container.client.user?.displayAvatarURL() })
			.addFields([
				{ name: 'Channel Name', value: `>>> ${channel.name ?? 'Unknown'}` },
				{ name: 'Created At', value: `>>> ${formatDiscordTimestamp(channel.createdAt!, 'R')}` },
				{ name: 'Channel Type', value: `>>> ${channel.type ?? 'Unknown'}` },
				{ name: 'Channel ID', value: `>>> ${channel.id ?? 'Unknown'}` }
			])
			.setTimestamp(new Date())
			.setFooter({ text: 'Logging-Module: channelDelete' });

		try {
			(sendChannel as TextChannel).send({ embeds: [embed] });
		} catch (error) {
			console.error(error);
		}
	}
}
