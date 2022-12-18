const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('md')
        .setDescription('Enviar MD a un usuario')
        .addUserOption(option => option
            .setName('objetivo')
            .setDescription('Receptor del mensaje')
            .setRequired(true))
        .addStringOption(option => option
            .setName('mensaje')
            .setDescription('Mensaje a enviar')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const user = interaction.options.getUser('objetivo');
        const mensaje = interaction.options.getString('mensaje');

        const embedMD = new EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setTitle('Nuevo mensaje')
            .setDescription(mensaje)
            .setColor('Blurple')
            .setFooter({ text: `Mensajes Directos | ${client.user.username}`, iconURL: client.user.displayAvatarURL() });
        
        try {
            user.send({ embeds: [embedMD] })
        } catch (error) {
            console.log(error);
            return interaction.reply({ content: `No se pudo enviar el mensaje.`, ephemeral: true});
        }
        interaction.reply({ content: `Mensaje enviado correctamente a ${user.username}.`, embeds: [embedMD], ephemeral: true });
    }
}