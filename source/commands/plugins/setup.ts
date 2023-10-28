import { Subcommand } from '@sapphire/plugin-subcommands';

import { Embed } from '../../lib';
import { AutoRole } from '../../prisma/';

export class UserCommand extends Subcommand {
	constructor(context: Subcommand.Context, options: Subcommand.Options) {
		super(context, {
			...options,
			name: 'setup',
			subcommands: [{ name: 'autorole', chatInputRun: 'chatInputAutorole' }]
		});
	}

	public override registerApplicationCommands(registry: Subcommand.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder //
				.setName('setup')
				.setDescription('setup commands of Blaze')
				.addSubcommand((command) =>
					command
						.setName('autorole')
						.setDescription('Setup Blazes Autorole system')
						.addRoleOption((option) => option.setName('role').setDescription('The role u want to give to new members').setRequired(true))
				)
		);
	}

	public async chatInputAutorole(interaction: Subcommand.ChatInputCommandInteraction) {
		const autorole = new AutoRole();

		const role = interaction.options.getRole('role', true);

		await autorole.set(interaction.guildId!, role.id);

		const embed = new Embed().success(`The Autorole has been set to <@&${role.id}>`);

		await interaction.reply({
			embeds: [embed],
			ephemeral: true
		});
	}
}
