const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('Enviar mensaje en este canal.')
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('Mensaje a enviar.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction, client) {
        const mensaje = interaction.options.getString(`mensaje`);
        const canal = interaction.channel;
        const sendEmbed = new EmbedBuilder()
            .setAuthor({ name: client.user.username })
            .setColor('Blurple')
            .setDescription(mensaje)
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
        canal.send({ embeds: [sendEmbed] })
        interaction.reply({ content: `Mensaje enviado:`, embeds: [sendEmbed], ephemeral: true })
    }
}