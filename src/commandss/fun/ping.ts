import {CommandInteraction} from "discord.js";

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Répond avec Pong !'),
    async execute(interaction: CommandInteraction) {
        return interaction.reply('Pong !');
    }
};