const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const Guild = require('../../schemas/guild');
const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("admin")
        .setDescription("Comandos administrativos")
        .addSubcommand(subcommand => subcommand
            .setName('timeout')
            .setDescription('Timeout a un usuario')
            .addUserOption(option => option.setName('user').setDescription('The user to timeout').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The reason for the timeout'))
            .addIntegerOption(option => option.setName('time').setDescription('The amount of minutes for the timeout.')))
        .addSubcommand(subcommand => subcommand
            .setName('stafflist')
            .setDescription('Lista de staffs'))
        .addSubcommand(subcommand => subcommand
            .setName('extralist')
            .setDescription('Lista de roles extra'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        await interaction.guild.roles.fetch();
        const guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
        if (!guildProfile) return interaction.reply({ content: 'El servidor no está en la base de datos. Usa el comando `/setup` para empezar.', ephemeral: true });
        const channel = interaction.channel;
        const currentDate = new Date();
        switch (interaction.options.getSubcommand()) {
            case 'timeout':
                const user = interaction.options.getUser('user');
                const staff = interaction.user;
                let reason = interaction.options.getString('reason');
                let time = interaction.options.getInteger("time");
                const member = await interaction.guild.members.fetch(user.id).catch(console.error);

                if (!reason) reason = 'No reason provided.';
                if (!time) time = null;

                /* Embeds */
                const embedTrue = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.guild.name}`})
                    .setTitle('Timeout aplicado')
                    .setDescription(`:timer: El timeout se ha aplicado correctamente.\nUsuario sancionado: ${user.tag}\nDuración: ${time}m.\nRazón: \`${reason}\`\nStaff: ${staff.tag}`)
                    .setColor('#00ff00')
                    .setFooter({ text: `ADMIN OVERRIDE | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

                const embedFalse = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.guild.name}`})
                    .setTitle('Error')
                    .setDescription(`:x: No se ha podido aplicar/retirar el timeout. El usuario es administrador o tiene roles por encima de mí.`)
                    .setColor('#ff5000')
                    .setFooter({ text: `ADMIN OVERRIDE | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })
    
                const embedRemove = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.guild.name}`})
                    .setTitle('Timeout eliminado')
                    .setDescription(`:white_check_mark: El timeout de ${user.tag} ha sido retirado correctamente.\nStaff: ${staff.tag}`)
                    .setColor('#00ff00')
                    .setFooter({ text: `ADMIN OVERRIDE | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

                const embedStaff = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.guild.name}`})
                    .setTitle('Timeout aplicado')
                    .setDescription(`:timer: El timeout se ha aplicado correctamente.\nStaff sancionado: ${user.tag}\nDuración: ${time}m.\nRazón: \`${reason}\`\nStaff: ${staff.tag}`)
                    .setColor('#ffa000')
                    .setFooter({ text: `ADMIN OVERRIDE | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

                await interaction.deferReply({ fetchReply: true });


                for (let i = 0; i<guildProfile.supportRoleId.length; i++) {
                    if(member.roles.cache.has(guildProfile.supportRoleId[i])) {
                        console.log('Member -> Staff');
                        console.log(`Role ID: ${guildProfile.supportRoleId[i]}`);
    
                        await member.timeout(time * 60 * 1000, reason).catch( console.error && interaction.editReply({ content: staff.mention, embeds: [embedFalse] }) );
                        return interaction.editReply({ embeds: [embedStaff] });
                    }
                    console.log(chalk.blueBright(`Not this role: ${guildProfile.supportRoleId[i]}`));
                }
            
                if (user.id === staff.id) return interaction.editReply({ content: staff.mention, embeds: [embedFalse] }) && console.log(`[/timeout] Staff = Member`);
                if (member.bannable === false) return interaction.editReply({ content: staff.mention, embeds: [embedFalse] }) && console.log(`[/timeout] Rol superior`);
                if (time === null) {
                    if (member.bannable === false) return interaction.editReply({ content: staff.mention, embeds: [embedFalse] }) && console.log(`[/timeout] Rol superior`);
                    if (member.bannable === true) {
                        member.timeout(time, reason);
                    interaction.editReply({ content: staff.mention, embeds: [embedRemove] })
                        return console.log(`[/timeout] Timeout retirado`);
                    }
                }
                
                await member.timeout(time * 60 * 1000, reason).catch( console.error && interaction.editReply({ content: staff.mention, embeds: [embedFalse] }));
                await interaction.editReply({ content: user.mention, embeds: [embedTrue] }).catch(console.log(chalk.green('Timeout applied')));
                break;
            case 'stafflist':
                const writtenStaff = [];
                const staffList = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.guild.name}` })
                    .setTitle("Staff list")
                    .setDescription(`${currentDate}`)
                    .setColor("#ffa000")
                    .setFooter({ text: `Staff List | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` });

                let invalidStaffRoles = "";
                const validStaffRoles = [];
                for (let i = 0; i < guildProfile.supportRoleId.length; i++) {
                    let j = 0;
                    const roleId = guildProfile.supportRoleId[i];
                    const staffRole = await interaction.guild.roles.cache.get(roleId);

                    if (staffRole) {
                        validStaffRoles.push(roleId);
                        const staffListMembers = staffRole.members.map((member) => member.user.tag);

                        for (let j = 0; j < staffListMembers.length; j++) {
                            const staffMember = staffListMembers[j];

                            if (writtenStaff.includes(staffMember)) {
                                staffListMembers.splice(j, 1);
                                j--;
                            } else {
                                writtenStaff.push(staffMember);
                            }
                        }

                        if (staffListMembers.length !== 0) {
                            const staffListFixed = staffListMembers.join('\n');
                            staffList.addFields({
                                name: `${staffRole.name}`,
                                value: `${staffListFixed}`
                            });   
                        }
                    } else {
                        console.log(`Role ID ${roleId} does no longer exist. Removing from the database.`);
                        invalidStaffRoles += `Role ID ${roleId} does no longer exist. Removing from the database.\n`;
                    }
                };

                guildProfile.supportRoleId = validStaffRoles;
                await guildProfile.save();

                channel.send({ embeds: [staffList] });
                interaction.reply({ content: `Stafflist sent to ${channel.name}.\n${invalidStaffRoles}`, embeds: [staffList], ephemeral: true });
                break;
            case 'extralist':
                const extraList = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.guild.name}` })
                    .setTitle("Extra role list")
                    .setDescription(`${currentDate}`)
                    .setColor("#ffa000")
                    .setFooter({ text: `Extra Role List | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` });

                let invalidExtraRoles = "";
                const validExtraRoles = [];

                for (let i = 0; i < guildProfile.extraRoleId.length; i++) {
                    const roleId = guildProfile.extraRoleId[i];
                    const extraRole = await interaction.guild.roles.cache.get(roleId);

                    if (extraRole) {
                        validExtraRoles.push(roleId);
                        const extraRoleListMembers = interaction.guild.roles.cache.get(roleId).members.map(member => member.user.tag);
                        const extraRoleListFixed = extraRoleListMembers.join('\n');
                        extraList.addFields({
                            name: `${extraRole.name}`,
                            value: `${extraRoleListFixed || 'None.'}`
                        });
                    } else {
                        console.log(`Role ID ${roleId} does no longer exist. Removing from the database.`);
                        invalidExtraRoles += `Role ID ${roleId} does no longer exist. Removing from the database.`;
                    }
                };

                guildProfile.extraRoleId = validExtraRoles;
                await guildProfile.save();

                channel.send({ embeds: [extraList] });
                interaction.reply({ content: `Extra role list sent to ${channel.name}.\n${invalidExtraRoles}`, embeds: [extraList], ephemeral: true });
                break;
        }
    }
};