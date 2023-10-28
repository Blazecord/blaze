import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

import { Embed } from '../../lib';

@ApplyOptions<Command.Options>({
	name: 'help',
	description: 'Get All Commands from the Blaze Bot'
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => builder.setName(this.name).setDescription(this.description));
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const commands = interaction.client.application?.commands.cache;
		if (commands) {
			commands.forEach((command) => {
				console.log(`Slash-Befehl: ${command.name}`);
			});
		}

		const embed = new Embed().success('Fertig BOOOOOOOOOOM');

		return interaction.reply({ embeds: [embed] });
	}
}
