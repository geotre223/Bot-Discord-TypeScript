import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export type Command = {
  data: SlashCommandBuilder;
  execute: (command: ChatInputCommandInteraction) => Promise<void> | void;
}