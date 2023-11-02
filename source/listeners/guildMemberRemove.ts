import { EmbedBuilder, GuildMember, TextChannel } from 'discord.js';

import { Events, Listener } from '@sapphire/framework';

import { Logging } from '../prisma';
import { formatDiscordTimestamp } from '../lib';

export class GuildMemberRemove extends Listener {
	private logging: Logging;

	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, {
			...options,
			event: Events.GuildMemberRemove
		});

		this.logging = new Logging();
	}

	public async run(member: GuildMember) {
		const loggingData = await this.logging.get(member.guild.id!);

		if (!loggingData) return;

		const channel = await member.guild?.channels.cache.get(loggingData.channelId);

		if (!channel) return;

		const embed = new EmbedBuilder()
			.setColor('#802e2e')
			.setAuthor({ name: 'Guild Member Remove', iconURL: this.container.client.user?.displayAvatarURL() })
			.addFields([
				{ name: 'Who?', value: `>>> ${member.user?.tag ?? 'Unknown'}` },
				{ name: 'Created At', value: `>>> ${formatDiscordTimestamp(member.user?.createdAt!, 'R')}` }
			])
			.setTimestamp(new Date())
			.setFooter({ text: 'Logging-Module: memberAdd' });

		try {
			(channel as TextChannel).send({ embeds: [embed] });
		} catch (error) {
			console.error(error);
		}
	}
}
