const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Guild = require('../../schemas/guild');
const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set')
        .setDescription('Ajustar parámetros de configuración')
        .addSubcommand(subcommand => subcommand
            .setName('staffrole')
            .setDescription('Cambia el rol de staff del servidor')
            .addRoleOption(option => option.setName('staff_role').setDescription('Rol de staff a seleccionar').setRequired(true))
            .addBooleanOption(option => option.setName('add_role').setDescription('Añadir rol o eliminar').setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('serverrole')
            .setDescription('Cambia el rol de servidor')
            .addRoleOption(option => option.setName('server_role').setDescription('Rol del servidor a seleccionar').setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('userrole')
            .setDescription('Cambia el rol de usuario del servidor')
            .addRoleOption(option => option.setName('user_role').setDescription('Rol de usuario a seleccionar').setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('extrarole')
            .setDescription('Cambia los roles extra del servidor')
            .addRoleOption(option => option.setName('extra_role').setDescription('Rol extra a seleccionar').setRequired(true))
            .addBooleanOption(option => option.setName('add_role').setDescription('Añadir rol o eliminar').setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('shreport')
            .setDescription('Cambia el canal de reportes de Shiny Hunt')
            .addChannelOption(option => option.setName('report_channel').setDescription('Canal del servidor a seleccionar').setRequired(true)))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
        if (!guildProfile) return interaction.reply({ content: 'El servidor no está en la base de datos. Usa el comando `/setup` para empezar.', ephemeral: true });
        switch (interaction.options.getSubcommand()) {
            case 'staffrole':
                const staffRole = await interaction.options.getRole('staff_role');
                console.log(`Staff Role: ${staffRole.name}, ${staffRole.id}`);
                const addOrRemove = await interaction.options.getBoolean('add_role');
                console.log(`Add or Remove: ${addOrRemove}`);

                switch (addOrRemove) {
                    case true:
                        try {
                            console.log(chalk.greenBright('Adding role to guild...'));
                            guildProfile.supportRoleId.push(staffRole.id);
                            await guildProfile.save().catch(console.error);
                        } catch (error) {
                            console.log(error);
                            interaction.reply({ content: 'Ha ocurrido un error al añadir el rol de staff. Inténtalo de nuevo.', ephemeral: true });
                        }
                        interaction.reply({ content: `Se ha añadido el rol ${staffRole.name} como rol de staff.`, ephemeral: true });
                        break;
                    case false:
                        try {
                            console.log(`Removing ${staffRole.id} from ${guildProfile.guildName}`)
                            guildProfile.supportRoleId.splice(guildProfile.supportRoleId.indexOf(staffRole.id), 1);
                            await guildProfile.save().catch(console.error);
                        } catch (error) {
                            console.log(error);
                            interaction.reply({ content: 'Ha ocurrido un error al eliminar el rol de staff. Inténtalo de nuevo.', ephemeral: true });
                        }
                        interaction.reply({ content: `Se ha eliminado el rol ${staffRole.name} de los roles de staff.`, ephemeral: true });
                        break;
                    default:
                        break;
                }
                break;
            case 'serverrole':
		        const serverRole = await interaction.options.getRole('server_role');
                try {
                    guildProfile.serverRoleId = serverRole.id;
                    guildProfile.save().catch(console.error);
                } catch (error) {
                    console.log(error);
                    interaction.reply({ content: 'Ha ocurrido un error al modificar el rol del servidor.'});
                }
                interaction.reply({ content: `Se ha establecido ${serverRole} como rol del servidor.` });
                break;
            case 'userrole':
                const userRole = await interaction.options.getRole('user_role');
                try {
                    guildProfile.userRoleId = userRole.id;
                    guildProfile.save().catch(console.error);
                } catch (error) {
                    console.log(error);
                    interaction.reply({ content: 'Ha ocurrido un error al modificar el rol de usuario del servidor.' });
                }
                interaction.reply({ content: `Se ha establecido ${userRole} como rol de usuario del servidor.` });
                break;
            case 'extrarole':
                const extraRole = await interaction.options.getRole('extra_role');
                const addOrRemove2 = await interaction.options.getBoolean('add_role');
                switch (addOrRemove2) {
                    case true:
                        try {
                            console.log(chalk.greenBright('Adding role to guild...'));
                            guildProfile.extraRoleId.push(extraRole.id);
                            await guildProfile.save().catch(console.error);
                        } catch (error) {
                            console.log(error);
                            interaction.reply({ content: 'Ha ocurrido un error al añadir el rol extra. Inténtalo de nuevo.', ephemeral: true });
                        }
                        interaction.reply({ content: `Se ha añadido el rol ${extraRole.name} como rol extra.`, ephemeral: true });
                        break;
                    case false:
                        try {
                            console.log(`Removing ${extraRole.id} from ${guildProfile.guildName}`)
                            guildProfile.extraRoleId.splice(guildProfile.extraRoleId.indexOf(extraRole.id), 1);
                            await guildProfile.save().catch(console.error);
                        } catch (error) {
                            console.log(error);
                            interaction.reply({ content: 'Ha ocurrido un error al eliminar el rol extra. Inténtalo de nuevo.', ephemeral: true });
                        }
                        interaction.reply({ content: `Se ha eliminado el rol ${extraRole.name} de los roles extra.`, ephemeral: true });
                        break;
                    default:
                        break;
                }
                break;
            case 'shreport':
                const reportChannel = await interaction.options.getChannel('report_channel');
                try {
                    guildProfile.reportChannelId = reportChannel.id;
                    guildProfile.save().catch(console.error);
                } catch (error) {
                    console.log(error);
                    interaction.reply({ content: 'Ha ocurrido un error al establecer el canal de envío de reportes.', ephemeral: true});
                }
                interaction.reply({ content: `Se ha añadido el canal ${reportChannel.name} como canal de envío de reportes.`, ephemeral: true });
                break;
            default:
                break;
        }
    }
}
