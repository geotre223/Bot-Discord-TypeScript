import type { Command } from "#/utils/command";
import { REST, Routes } from "discord.js";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { env } from "#/utils/env";
import { clientInfo } from "#/configs/client";
import { guild } from "#/configs/guild";

void (async() => {
  const commands = [];

  // Grab all the command folders from the commands directory you created earlier:
  const foldersPath = join(__dirname, "commands");
  const commandFolders = readdirSync(foldersPath);

  for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier:
    const commandsPath = join(foldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment:
    for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      const command = await import(filePath) as Command;

      commands.push(command.data.toJSON());
    }
  }

  // Construct and prepare an instance of the REST module
  const rest = new REST().setToken(env.botToken);

  // and deploy your commands!
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    await rest.put(
      Routes.applicationGuildCommands(clientInfo.id, guild.id),
      { body: commands },
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();