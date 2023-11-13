import { Events, Listener } from '@sapphire/framework';
import { Message } from 'discord.js';
import { Embed } from '../lib';

export class ApplicationCommandOnly extends Listener {
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, {
			...options,
			event: Events.MessageCreate
		});
	}

	public async run(message: Message) {
		if (message.author.bot) return;

		if (message.content.startsWith(`<@${this.container.client.user?.id}>`)) {
			const embed = new Embed().error('Due to Discord Switching to Slash Commands, Blaze is now only available via Slash Commands!');

			await message.reply({
				embeds: [embed]
			});
		}
	}
}
