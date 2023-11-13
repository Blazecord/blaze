import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

import { Embed } from '../../lib';

@ApplyOptions<Command.Options>({
	name: 'ping',
	description: "Shows Blaze's latency"
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		try {
			const pingMessage = await interaction.reply({ content: 'Pinging...', fetchReply: true, ephemeral: true });
			const embed = new Embed().success(`Pong! ${pingMessage.createdTimestamp - interaction.createdTimestamp}ms`, '<:wlan:1167479926409146428>');

			await interaction.editReply({
				embeds: [embed]
			});
		} catch (error) {
			const embed = new Embed().error("Something went wrong, please try again later!");

			await interaction.reply({
				embeds: [embed],
				ephemeral: true
			});

			throw new Error(error as string);
		}
	}
}
