import { Command } from '@sapphire/framework';
import { EmbedBuilder } from 'discord.js';

export class UserCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			name: 'serverinfo',
			description: 'Shows information about the server',
		})
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder //
				.setName('serverinfo')
				.setDescription('Shows information about the server')
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const embed = new EmbedBuilder()
			.setColor("#802e2e")
			.setThumbnail(interaction.guild?.iconURL() ?? "")
			.addFields(
				[
					{ name: 'Info', value: `>>> Name: ${interaction.guild?.name}\nId: ${interaction.guild?.id}`, inline: true},
				]
			)

		await interaction.reply({ embeds: [embed] });
	}
}
