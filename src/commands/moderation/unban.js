const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a user')
        .addUserOption(option => option.setName('user').setDescription('The user to unban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the unban').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction, client) {
        const guild = interaction.guild.members;
        const user = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason');

        if (!reason) reason = 'No reason provided';

        /* Embeds */
        const embedTrue = new EmbedBuilder()
            .setAuthor({ name: 'Pokémon Kingdom' })
            .setTitle('Unban Aplicado')
            .setDescription(`Miembro: ${user.tag}\nModerador: ${interaction.user.tag}\nRazón: ${reason}`)
            .setColor('#00ff00')
            .setFooter({ text: 'Pokémon Kingdom', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        const embedFalse = new EmbedBuilder()
            .setAuthor({ name: 'Pokémon Kingdom' })
            .setTitle('Error')
            .setDescription(`Ha ocurrido un error y no se ha podido aplicar el unban.\nStaff encargado: ${interaction.user.tag}\nMiembro: ${user.tag}`)
            .setColor('#ff5000')
            .setFooter({ text: 'Pokémon Kingdom', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        await interaction.deferReply({ fetchReply: true });

        await guild.unban(user, { reason: `${interaction.user.tag}: ${reason}` }).catch(console.error);

        interaction.editReply({ })
    }
}