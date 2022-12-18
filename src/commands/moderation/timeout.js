const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

const Guild = require('../../schemas/guild');
const mongoose = require('mongoose');

const chalk = require('chalk');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeouts a user.')
        .addUserOption(option => option.setName('user').setDescription('The user to timeout').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the timeout'))
        .addIntegerOption(option => option.setName('time').setDescription('The amount of minutes for the timeout.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client) {
        console.log(chalk.yellow(`[LOGS] ${interaction.user.tag} has ran the /timeout command.`));

        let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
        if (!guildProfile) {
            return interaction.reply({ content: 'Escribe el comando /setup antes de usar este comando.', ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        const staff = interaction.user;
        let reason = interaction.options.getString('reason');
        let time = interaction.options.getInteger('time');
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

        if (!reason) reason = 'No reason provided.';
        if (!time) time = null;

        /* Embeds */
        const embedTrue = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name}`})
            .setTitle('Timeout aplicado')
            .setDescription(`:timer: El timeout se ha aplicado correctamente.\nUsuario: ${user.tag}\nDuración: ${time}m.\nRazón: \`${reason}\`\nStaff: ${staff.tag}`)
            .setColor('#00ff00')
            .setFooter({ text: interaction.guild.name, iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        const embedFalse = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name}`})
            .setTitle('Error')
            .setDescription(`:x: No se ha podido aplicar/retirar el timeout. El usuario es administrador o tiene roles por encima de mí.`)
            .setColor('#ff5000')
            .setFooter({ text: interaction.guild.name, iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })
        
        const embedRemove = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name}`})
            .setTitle('Timeout eliminado')
            .setDescription(`:white_check_mark: El timeout de ${user.tag} ha sido retirado correctamente.\nStaff: ${staff.tag}`)
            .setColor('#00ff00')
            .setFooter({ text: interaction.guild.name, iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        const embedStaff = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name}`})
            .setTitle('Error')
            .setDescription(`:x: Has intentado sancionar a un miembro del staff.`)
            .setColor('#ff5000')
            .setFooter({ text: interaction.guild.name, iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        await interaction.deferReply({ fetchReply: true });


        for (let i = 0; i<guildProfile.supportRoleId.length; i++) {
            if(member.roles.cache.has(guildProfile.supportRoleId[i])) {
                console.log('Member -> Staff');
                console.log(`Role ID: ${guildProfile.supportRoleId[i]}`);
                interaction.editReply({ embeds: [embedStaff] });
                return;
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
    }
}