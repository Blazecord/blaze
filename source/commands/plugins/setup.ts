import { Subcommand } from '@sapphire/plugin-subcommands';

import { Embed } from '../../lib';
import { AutoRole, Logging } from '../../prisma/';

export class UserCommand extends Subcommand {
	constructor(context: Subcommand.Context, options: Subcommand.Options) {
		super(context, {
			...options,
			name: 'setup',
			subcommands: [
				{ name: 'autorole', chatInputRun: 'chatInputAutorole' },
				{ name: 'logging', chatInputRun: 'chatInputLogging' }
			]
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
						.addRoleOption((option) => option.setName('role').setDescription('The role you want to give to new members').setRequired(true))
				)
				.addSubcommand((command) =>
					command
						.setName('logging')
						.setDescription('Setup Blazes Logging system')
						.addChannelOption((option) => option.setName('channel').setDescription('The channel you want to send the logs to').setRequired(true))
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

	public async chatInputLogging(interaction: Subcommand.ChatInputCommandInteraction) {
		const logging = new Logging();

		const channel = interaction.options.getChannel('channel', true);

		await logging.set(interaction.guildId!, channel.id)

		const embed = new Embed().success(`The Logging channel has been set to <#${channel.id}>`);

		await interaction.reply(
			{
				embeds: [embed],
			}
		)

	}
}
