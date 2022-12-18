const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('robo')
        .setDescription('Timeout por robo de SH')
        .addUserOption(option => option.setName('objetivo').setDescription('Usuario a sancionar').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client) {
        const member = interaction.options.getMember('objetivo');
        const staff = interaction.user;
        const time = 600000;
        const reason = `Robo de SH - ${staff.tag}`;

        const embedTrue = new EmbedBuilder()
            .setAuthor({ name: 'Pokémon Kingdom' })
            .setTitle('Sancionado')
            .setDescription(`:timer: ${member.user.tag} ha sido sancionado durante ${time/1000/60}m por robo de SH.\nStaff encargado de la sanción: ${staff.tag}`)
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

        if (member.id === staff.id) return interaction.reply({ content: staff.mention, embeds: [embedIgual] }) && console.log(`[/robo] Staff = Member`);
        if ((member.bannable === false)) return interaction.reply({ content: staff.mention, embeds: [embedFalse] }) && console.log(`[/robo] Rol superior`);
        member.timeout(time, reason)
        await interaction.reply({ content: member.mention, embeds: [embedTrue] }) && console.log(`[/robo] Timeout aplicado`);
    }
}