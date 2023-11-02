import { GuildMember } from 'discord.js';

import { Events, Listener } from '@sapphire/framework';

import { AutoRole } from '../prisma';

export class UserEvent extends Listener {
	private autoRole: AutoRole;
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, {
			...options,
			event: Events.GuildMemberAdd
		});

		this.autoRole = new AutoRole();
	}
	public async run(member: GuildMember) {
		const autoRoleData = await this.autoRole.get(member.guild.id);
		if (!autoRoleData) return;

		const role = await member.guild.roles.fetch(autoRoleData.roles);
		if (!role) return;

		try {
			await member.roles.add(role);
		} catch (error) {
			return;
		}
	}
}
