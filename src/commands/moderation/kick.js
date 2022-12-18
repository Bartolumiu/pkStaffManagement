const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const chalk = require('chalk');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user from the server.')
        .addUserOption(option => option.setName('user').setDescription('The user to kick.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the kick.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason');
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

        if (!reason) reason = 'No reason provided.';
        /* Embeds */
        const embedMiembro = new EmbedBuilder()
            .setAuthor({ name: client.user.name })
            .setTitle('Kick')
            .setDescription(`Has sido expulsado de: ${interaction.guild.name}`)
            .setFooter({ text: `Kick | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true}) || client.user.displayAvatarURL({ dynamic: true }) }` })
            .setColor('#ff5000')
            .addFields([
                {
                    name: 'Razón:',
                    value: reason
                }
            ]);

        user.send({ embeds: [embedMiembro] }).catch(console.log(chalk.yellow('[Kick] User\'s DM\'s are off.')));

        await member.kick(reason).catch(console.error);

        interaction.reply({ embeds: [embedKick] });
    }
}