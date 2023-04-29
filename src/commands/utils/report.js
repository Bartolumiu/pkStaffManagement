const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Guild = require('../../schemas/guild');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Reportar algo o a alguien')
        .addSubcommand(subcommand => subcommand
            .setName('sh')
            .setDescription('Reportar robo de Shiny Hunt')
            .addUserOption(option => option.setName('usuario').setDescription('Usuario a reportar').setRequired(true))
            .addStringOption(option => option.setName('url_mensaje').setDescription('URL del mensaje del bot').setRequired(true))
            .addAttachmentOption(option => option.setName('imagen').setDescription('Captura de pantalla del robo de SH (opcional)'))),
    async execute(interaction, client) {
        const attachment = interaction.options.getAttachment('imagen') || null;
        const reportedUser = interaction.options.getUser('usuario');
        const reportingUser = interaction.user;
        const member = await interaction.guild.members.fetch(reportedUser.id).catch(console.error);
        const urlMensaje = await interaction.options.getString('url_mensaje');
	const server = interaction.guild;

        const guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
        if (!guildProfile) return interaction.reply({ content: 'El servidor no está en la base de datos. Usa el comando `/setup` para empezar.', ephemeral: true });
        switch (interaction.options.getSubcommand()) {
            case 'sh':
                const shReportEmbed = new EmbedBuilder()
                    .setAuthor({ name: `${client.user.username}` })
                    .setTitle('Nuevo reporte por Shiny Hunt')
                    .setColor('Orange')
                    .setDescription('Se ha recibido un nuevo reporte por Shiny Hunt en el servidor.')
                    .setFooter({ text: `Reporte Shiny Hunt | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true })}` })
                    .addFields([
                        {
                            name: 'Usuario reportado:',
                            value: `${reportedUser.tag} (${member.id})`
                        },
                        {
                            name: 'Reporte enviado por:',
                            value: `${reportingUser.tag} (${reportingUser.id})`
                        },
                        {
                            name: 'URL mensaje',
                            value: `${urlMensaje}`
                        }
                    ]);


                const shReportReply = new EmbedBuilder()
                    .setAuthor({ name: `${client.user.username}` })
                    .setTitle('Reporte recibido correctamente')
                    .setColor('#00ff00')
                    .setDescription('Tu reporte se ha recibido correctamente y pronto se revisará.\nDebajo tienes una copia del aviso recibido:')
                    .setFooter({ text: `Reporte Recibido | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true })}` });
                
                if (attachment) shReportEmbed.setImage(attachment.url);

                if (interaction.guild.id == '716661037297959004') {
                    const channel = await client.channels.cache.get('1072552001361154058');
                    await channel.send({ embeds: [shReportEmbed]});
                    interaction.reply({ embeds: [shReportReply, shReportEmbed], ephemeral: true});
                } else {
                    await interaction.guild.channels.fetch();
                    const channel = await client.channels.cache.get(guildProfile.reportChannelId);
                    await channel.send({ embeds: [shReportEmbed]});
                    interaction.reply({ embeds: [shReportReply, shReportEmbed], ephemeral: true});
                }

                break;
        
            default:
                break;
        }
    }
}
