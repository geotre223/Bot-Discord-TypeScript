import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("avatar")
  .setDescription("Get the avatar URL of the selected user, or your own avatar.")
  .addUserOption(option => option
    .setName("target")
    .setDescription("The user's avatar to show"));

export function execute(interaction: ChatInputCommandInteraction): void {
  const user = interaction.options.getUser("target");

  if (user) {
    void interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL()}`);
    return;
  }

  void interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL()}`);
}