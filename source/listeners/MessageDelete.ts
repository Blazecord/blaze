import { EmbedBuilder, Message, TextChannel } from 'discord.js';

import { Events, Listener } from '@sapphire/framework';

import { Logging } from '../prisma';

export class UserEvent extends Listener {
    private logging: Logging;

    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            event: Events.MessageDelete
        });

        this.logging = new Logging();
    }

    public async run(message: Message) {
        const loggingData = await this.logging.get(message.guildId!);

        if (!loggingData) return;

        const channel = await message.guild?.channels.cache.get(loggingData.channelId);

        if (!channel) return;

        if (!message.content) return;

        const embed = new EmbedBuilder()
            .setColor("#802e2e")
            .setAuthor({ name: "Message Deleted", iconURL: this.container.client.user?.displayAvatarURL()})
            .addFields(
                [
                    { name: "Who Deleted", value: `>>> ${message.author.tag ?? "Unknown"}`},
                    { name: "Channel", value: `>>> <#${message.channelId!}>` },
                    { name: "Message", value: `>>> ${message.content}` }
                ]
            )
            .setTimestamp(new Date())
            .setFooter({ text: "Logging-Module: messageDelete" })

        try {
            (channel as TextChannel).send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    }
}