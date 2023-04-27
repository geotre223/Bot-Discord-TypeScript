import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("say")
  .setDescription("dit ce que vous indiquez au bot")
  .addStringOption(option => option
    .setName("say")
    .setDescription("message qui sera envoyé")
    .setRequired(true));

export function execute(interaction: ChatInputCommandInteraction): void {
  const message = interaction.options.getString("say", true);

  void interaction.reply(`${message}`);
}