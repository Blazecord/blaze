import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

import { Embed } from '../../lib';

@ApplyOptions<Command.Options>({
	name: 'avatar',
	description: 'Shows the Avatar of a User'
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addUserOption((option) => option.setName('user').setDescription('The user to get Avatar from').setRequired(true))
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const embed = new Embed()
			.setImage(interaction.options.getUser('user', true).displayAvatarURL() ?? '')
			.success(`[URL](${interaction.options.getUser('user', true).displayAvatarURL()})`);

		return interaction.reply({
			embeds: [embed]
		});
	}
}
