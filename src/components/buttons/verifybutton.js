const mongoose = require('mongoose');
const Guild = require('../../schemas/guild');

module.exports = {
    data: {
        name: 'verifybutton'
    },
    async execute(interaction, client) {
        let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
        if (!guildProfile) {
            await interaction.reply({ content: 'Ha ocurrido un error al ejecutar este comando.'});
        }

        if (!guildProfile.userRoleId) return interaction.reply({ content: 'No se ha configurado un rol para los usuarios.' });

        const rolesButton = new ButtonBuilder()
            .setLabel('Autoroles')
            .setURL('https://discord.com/channels/716661037297959004/868492374370836500')
            .setStyle(ButtonStyle.Link);

        const userRole = await interaction.guild.roles.fetch(guildProfile.userRoleId).catch(console.error);
        await interaction.deferReply({ fetchReply: true, ephemeral: true });
        
        await interaction.member.roles.add(userRole).catch(console.error);
        await interaction.editReply({ content: 'Cuenta verificada correctamente.', components: [ new ActionRowBuilder().addComponents(rolesButton) ], ephemeral: true });
    }
}
