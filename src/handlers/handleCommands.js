const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const chalk = require('chalk');

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync(`./src/commands`);
        /* Debug start */
        const commandFolderAmount = commandFolders.length;
        let actualCommandFolder = 1;
        /* Debug finish */

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith('.js'));
            /* Debug start */
            const commandFilesAmount = commandFiles.length;
            let actualCommandFile = 1;
            /* Debug finish */

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(chalk.green(`[Command Handler] Command ${command.data.name} loaded. Command ${actualCommandFile}/${commandFilesAmount} | Folder ${actualCommandFolder}/${commandFolderAmount}`));
                actualCommandFile = actualCommandFile + 1;
            }
            actualCommandFolder = actualCommandFolder + 1;
        }
        const clientId = '810942628152868905';
        const rest = new REST({ version: '9' }).setToken(process.env.token);
        try {
            console.log(chalk.cyan('[Command Handler] Started refreshing application (/) commands.'));

            await rest.put(Routes.applicationCommands(clientId), {
                body: client.commandArray,
            });

            console.log(chalk.green('[Command Handler] Successfully reloaded application (/) commands.'));
        } catch (error) {
            console.error(error);
        }
    };
};
