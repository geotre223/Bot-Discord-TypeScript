import {SlashCommandBuilder, CommandInteraction} from "discord.js";

export const data = new SlashCommandBuilder()
        .setName('say')
        .setDescription('dit ce que vous indiquez au bot')
        .addStringOption(option =>
            option
                .setName('say')
                .setDescription('message qui sera envoyé')
                .setRequired(true));

export function execute(interaction: CommandInteraction) {
        const message = interaction.options.get('say');
        return interaction.reply(`${message}`);
}
