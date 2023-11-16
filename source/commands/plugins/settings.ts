import { Subcommand } from "@sapphire/plugin-subcommands";
import { PermissionFlagsBits } from "discord.js";

import { Embed } from '../../lib/';
import { AltDetection } from '../../prisma';

export class UserCommand extends Subcommand {
    constructor(context: Subcommand.Context, options: Subcommand.Options) {
        super(context, {
            ...options,
            name: 'settings',
            subcommands: [
                {
                    name: 'alt-detection',
                    chatInputRun: 'chatInputAltDetection',
                }
            ]
        })
    }

    public override registerApplicationCommands(registry: Subcommand.Registry) {
        registry.registerChatInputCommand((builder) => 
            builder
                .setName('settings')
                .setDescription('settings commands of Blaze')
                .setDMPermission(false)
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
                .addSubcommand((command) => 
                    command
                        .setName('alt-detection')
                        .setDescription('Setup Alt Detection for your Guild')
                        .addNumberOption((option) =>
                            option.setName('days').setDescription('The amount of days to check for').setRequired(true)
                        )
                )
        );
    }

    public async chatInputAltDetection(interaction: Subcommand.ChatInputCommandInteraction) {
        try {
            const altDetection = new AltDetection();

            const days = interaction.options.getNumber('days', true);

            await altDetection.set(interaction.guildId!, days)

            const embed = new Embed().success(`The Alt Detection has been set to ${days} days`);

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
}