import { Subcommand } from '@sapphire/plugin-subcommands';

import { Embed } from '../../lib';
import { AutoRole, Logging } from '../../prisma/';
import { PermissionFlagsBits } from 'discord.js';

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
				.setDMPermission(false)
				.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
				.addSubcommand((command) =>
					command
						.setName('autorole')
						.setDescription('Setup AutoRoles for your Guild')
						.addRoleOption((option) =>
							option.setName('role').setDescription('The Role you want to give to new members').setRequired(true)
						)
				)
				.addSubcommand((command) =>
					command
						.setName('logging')
						.setDescription('Setup Logging for your Guild')
						.addChannelOption((option) =>
							option.setName('channel').setDescription('The Channel you want to send the logs to').setRequired(true)
						)
				)
		);
	}

	public async chatInputAutorole(interaction: Subcommand.ChatInputCommandInteraction) {
		try {
			const autorole = new AutoRole();

			const role = interaction.options.getRole('role', true);

			await autorole.set(interaction.guildId!, role.id);

			const embed = new Embed().success(`The Autorole has been set to <@&${role.id}>`);

			await interaction.reply({
				embeds: [embed],
				ephemeral: true
			});
		} catch (error) {
			const embed = new Embed().error('Something went wrong, please try again later!');

			await interaction.reply({
				embeds: [embed],
				ephemeral: true
			});

			throw new Error(error as string);
		}
	}

	public async chatInputLogging(interaction: Subcommand.ChatInputCommandInteraction) {
		try {
			const logging = new Logging();

			const channel = interaction.options.getChannel('channel', true);

			await logging.set(interaction.guildId!, channel.id);

			const embed = new Embed().success(`The Logging channel has been set to <#${channel.id}>`);

			await interaction.reply({
				embeds: [embed]
			});
		} catch (error) {
			const embed = new Embed().error('Something went wrong, please try again later!');

			await interaction.reply({
				embeds: [embed],
				ephemeral: true
			});

			throw new Error(error as string);
		}
	}
}
