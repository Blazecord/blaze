import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

import { Embed } from '../lib/';

@ApplyOptions<Command.Options>({
	name: 'avatar',
	description: '👤 Get the Avatar from a Member'
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addUserOption((option) =>
					option 
						.setName('user')
						.setDescription('The user u want the Avatar from')
						.setRequired(true))
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction,) {
		const pingMessage = await interaction.reply({content: "Pinging...", fetchReply: true, ephemeral: true});
		const embed = new Embed()
			.success(`Pong! ${pingMessage.createdTimestamp - interaction.createdTimestamp}ms`, "<:wlan:1167479926409146428>")
		
		embed.setImage(
			interaction.options.getUser('user')?.displayAvatarURL({ dynamic: true }
		)

		return interaction.editReply(
			{
				embeds: [embed],
			}
		)
	}
}
