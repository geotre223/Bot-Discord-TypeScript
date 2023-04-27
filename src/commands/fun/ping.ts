import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Répond avec Pong !");

export function execute(interaction: ChatInputCommandInteraction): void {
  void interaction.reply("Pong !");
}