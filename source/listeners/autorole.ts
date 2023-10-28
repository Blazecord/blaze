import { Listener, Events } from '@sapphire/framework';
import { GuildMember } from 'discord.js';

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
		console.log('User joined');
		console.log(await this.autoRole.get(member.guild.id));
	}
}
