import { ColorResolvable, EmbedBuilder } from 'discord.js';

export class Embed extends EmbedBuilder {
	private color: string;
	private error_color: string;
	private warning_color: string;
	private no: string;
	private yes: string;
	private warning_emoji: string;

	constructor() {
		super();
		this.color = '#802e2e';
		this.error_color = '#ff0000';
		this.warning_color = '#d49d08';
		this.yes = '<:yes:1167479930578276402>';
		this.no = '<:no:1167479897405542432>';
		this.warning_emoji = '<:warn:1167479923611537449>';
	}

	public success(message: string, emoji?: string) {
		if (emoji) {
			this.setDescription(`>>> ${emoji} ${message}`);
			this.setColor(this.color as ColorResolvable);

			return this;
		} else {
			this.setDescription(`>>> ${this.yes} ${message}`);
			this.setColor(this.color as ColorResolvable);

			return this;
		}
	}

	public error(message: string) {
		this.setDescription(`>>> ${this.no} ${message}`);
		this.setColor(this.error_color as ColorResolvable);

		return this;
	}

	public warning(message: string) {
		this.setDescription(`>>> ${this.warning_emoji} ${message}`);
		this.setColor(this.warning_color as ColorResolvable);

		return this;
	}
}
