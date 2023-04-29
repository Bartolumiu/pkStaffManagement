const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('replypost')
        .setDescription('Enviar resolución de las postulaciones')
        .addUserOption(option => option.setName('objetivo').setDescription('Receptor del mensaje').setRequired(true))
        .addBooleanOption(option => option.setName('aprobado').setDescription('Postulación aprobada?').setRequired(true))
        .addStringOption(option => option.setName('motivo').setDescription('Motivo del rechazo'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const user = interaction.options.getUser('objetivo');
        const aprobado = interaction.options.getBoolean('aprobado');

        const embedReply = new EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setTitle('Respuesta postulaciones')
            .setColor('Blurple')
            .setFooter({ text: `Resultados postulaciones | ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

        try {
            if (!aprobado) {
                const motivo = interaction.options.getString('motivo');
                embedReply.setDescription(`\n══════════ஓ๑ <:pk_LogoServer:993822358857064530> ๑ஓ══════════\n\n**POSTULACIONES STAFF POKÉMON KINGDOM**\n\nNombre del postulante: ${user.tag}\nID del postulante: ${user.id}\nEstado de la postulación: Rechazada\nMotivo: ${motivo}\n\n══════════ஓ๑ <:pk_LogoServer:993822358857064530> ๑ஓ══════════`);
            } else {
                embedReply.setDescription(`\n══════════ஓ๑ <:pk_LogoServer:993822358857064530> ๑ஓ══════════\n\n**POSTULACIONES STAFF POKÉMON KINGDOM**\n\nNombre del postulante: ${user.tag}\nID del postulante: ${user.id}\nEstado de la postulación: Aprobada\n\n══════════ஓ๑ <:pk_LogoServer:993822358857064530> ๑ஓ══════════`);
            }
            await user.send({ embeds: [embedReply] });
            interaction.reply({ content: `Mensaje enviado correctamente a ${user.username}.`, embeds: [embedReply], ephemeral: true });
        } catch (error) {
            console.log(error);
            return interaction.reply({ content: `No se pudo enviar el mensaje.`, ephemeral: true })
        }
    }
}
