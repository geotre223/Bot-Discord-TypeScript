import type { Command } from "#/utils/command";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { env } from "#/utils/env";

// Create client instance:
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load commands:
export const commands = new Collection<string, Command>();

void (async() => {
  const foldersPath = join(__dirname, "commands");
  const commandFolders = readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = join(foldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

    for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      const command = await import(filePath) as Command;

      commands.set(command.data.name, command);
    }
  }
})();

client.once(Events.ClientReady, () => {
  console.log("Ready!");
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
    } else {
      await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
  }
});

void client.login(env.botToken);