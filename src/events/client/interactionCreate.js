const { InteractionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {

            /* Embeds errores */
            const IntChatInput = new EmbedBuilder()
                .setAuthor({ name: client.user.tag})
                .setTitle('Error')
                .setDescription('Ha ocurrido un error al ejecutar este comando.\nEnvía una captura de pantalla con este mensaje a <@324542832557686785> para solucionar el problema.')
                .addFields({ name: 'Código de error', value: 'ERR_INT_CH_IN' })
                .setColor('#ff5000')
                .setFooter({ text: `ERR_INT_CH_INP | ${client.user.tag}`, iconURL: client.user.displayAvatarURL()})

            const IntButton = new EmbedBuilder()
                .setAuthor({ name: client.user.tag})
                .setTitle('Error')
                .setDescription('Ha ocurrido un error al ejecutar este comando.\nEnvía una captura de pantalla con este mensaje a <@324542832557686785> para solucionar el problema.')
                .addFields({ name: 'Código de error', value: 'ERR_INT_BT_IN' })
                .setColor('#ff5000')
                .setFooter({ text: `ERR_INT_BT_IN | ${client.user.tag}`, iconURL: client.user.displayAvatarURL()})

            const IntSelectMenu = new EmbedBuilder()
                .setAuthor({ name: client.user.tag})
                .setTitle('Error')
                .setDescription('Ha ocurrido un error al ejecutar este comando.\nEnvía una captura de pantalla con este mensaje a <@324542832557686785> para solucionar el problema.')
                .addFields({ name: 'Código de error', value: 'ERR_INT_SEL_MENU' })
                .setColor('#ff5000')
                .setFooter({ text: `ERR_INT_SEL_MENU | ${client.user.tag}`, iconURL: client.user.displayAvatarURL()})

            const IntModal = new EmbedBuilder()
                .setAuthor({ name: client.user.tag})
                .setTitle('Error')
                .setDescription('Ha ocurrido un error al ejecutar este comando.\nEnvía una captura de pantalla con este mensaje a <@324542832557686785> para solucionar el problema.')
                .addFields({ name: 'Código de error', value: 'ERR_INT_MODAL' })
                .setColor('#ff5000')
                .setFooter({ text: `ERR_INT_MODAL | ${client.user.tag}`, iconURL: client.user.displayAvatarURL()})

            const IntContextMenu = new EmbedBuilder()
                .setAuthor({ name: client.user.tag})
                .setTitle('Error')
                .setDescription('Ha ocurrido un error al ejecutar este comando.\nEnvía una captura de pantalla con este mensaje a <@324542832557686785> para solucionar el problema.')
                .addFields({ name: 'Código de error', value: 'ERR_INT_CONT_MENU' })
                .setColor('#ff5000')
                .setFooter({ text: `ERR_INT_CONT_MENU | ${client.user.tag}`, iconURL: client.user.displayAvatarURL()})

            const IntAutocomplete = new EmbedBuilder()
                .setAuthor({ name: client.user.tag})
                .setTitle('Error')
                .setDescription('Ha ocurrido un error al ejecutar este comando.\nEnvía una captura de pantalla con este mensaje a <@324542832557686785> para solucionar el problema.')
                .addFields({ name: 'Código de error', value: 'ERR_INT_COMP' })
                .setColor('#ff5000')
                .setFooter({ text: `ERR_INT_COMP | ${client.user.tag}`, iconURL: client.user.displayAvatarURL()})
                
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return new Error('Command not found.');

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    embeds: [IntChatInput],
                    ephemeral: true
                });
            }
        } else if (interaction.isButton()) {
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);
            if (!button) return new Error('There is no code for this button.');

            try {
                await button.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ embeds: [IntButton], ephemeral: true});
            }
        } else if (interaction.isSelectMenu()) {
            const { selectMenus } = client;
            const { customId } = interaction;
            const menu = selectMenus.get(customId);
            if(!menu) return new Error('There is no code for this menu.')

            try {
                await menu.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ embeds: [IntSelectMenu], ephemeral: true});
            }
        } else if (interaction.type == InteractionType.ModalSubmit) {
            const { modals } = client;
            const { customId } = interaction;
            const modal = modals.get(customId);
            if(!modal) return new Error('There is no code for this modal.')

            try {
                await modal.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ embeds: [IntModal], ephemeral: true });
            }
        } else if (interaction.isContextMenuCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const contextCommand = commands.get(commandName);
            if (!contextCommand) return;

            try {
                await contextCommand.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ embeds: [IntContextMenu], ephemeral: true });
            }
        } else if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if(!command) return;

            try {
                await command.autocomplete(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ embeds: [IntAutocomplete], ephemeral: true });
            }
        }
    },
};