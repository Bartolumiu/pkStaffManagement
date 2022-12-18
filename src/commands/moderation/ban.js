const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server.')
        .addUserOption(option => option.setName('user').setDescription('The user to ban.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason');
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);
        const staff = interaction.user;

        if (!reason) reason = 'No reason provided.';

        const embedTrue = new EmbedBuilder()
            .setAuthor({ name: 'Pokémon Kingdom' })
            .setTitle('Sancionado')
            .setDescription(`:hammer: ${member.user.tag} ha sido baneado del servidor.\nStaff encargado de la sanción: ${staff.tag}\nRazón: ${reason}`)
            .setColor('#00ff00')
            .setFooter({ text: 'Pokémon Kingdom', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })
        
        const embedFalse = new EmbedBuilder()
            .setAuthor({ name: 'Pokémon Kingdom'})
            .setTitle('Error al sancionar al usuario.')
            .setDescription(`:x: No se ha podido aplicar la sanción.`)
            .setColor('#ff0000')
            .setFooter({ text: 'Pokémon Kingdom', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })
            
        const embedIgual = new EmbedBuilder()
			.setAuthor({ name: 'Pokémon Kingdom' })
			.setColor('#ff0000')
			.setTitle('Error al sancionar al usuario')
			.setDescription('Te has intentado sancionar a tí mismo, ¿todo bien por ahí?')
			.setFooter({ text: 'Pokémon Kingdom', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })
        
        if (member.id === staff.id) return interaction.reply({ content: staff.mention, embeds: [embedIgual] }) && console.log(`[/ban] Staff = Member`);
        if ((member.bannable === false)) return interaction.reply({ content: staff.mention, embeds: [embedFalse] }) && console.log(`[/ban] Rol superior`);
        await member.ban({ reason: `${interaction.user.tag}: ${reason}` }).catch(console.error);

        interaction.reply({ content: staff.mention, embeds: [embedTrue], ephemeral: true });
    }
}
