const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

require('dotenv').config();
const dotenv = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Información.')
        .addSubcommand(subcommand => subcommand
            .setName('server')
            .setDescription('Información sobre el servidor'))
        .addSubcommand(subcommand => subcommand
            .setName('user')
            .setDescription('Información sobre un usuario')
            .addUserOption(option => option
                .setName('usuario')
                .setDescription('Usuario a buscar')
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('bot')
            .setDescription('Información sobre el bot')),
    async execute(interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case 'server':
                const banList = await interaction.guild.bans.fetch();
                const embedServer = new EmbedBuilder()
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })})
                .setColor('Blurple')
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .addFields([
                    {
                        name: 'Nombre del servidor',
                        value: interaction.guild.name
                    },
                    {
                        name: 'ID del servidor',
                        value: interaction.guild.id
                    },
                    {
                        name: 'Fecha de creación',
                        value: `${interaction.guild.createdAt}`
                    },
                    {
                        name: 'Miembros',
                        value: interaction.guild.memberCount.toString()
                    },
                    {
                        name: 'Propietario del servidor',
                        value: `<@${interaction.guild.ownerId}>`
                    },
                    {
                        name: 'Conteo de bans (F por los caídos, o tal vez no :wink:)',
                        value: `${banList.size}`
                    }
                ])
                .setFooter({ text: `Información del servidor | ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) });

                interaction.reply({ embeds: [embedServer] });
                break;
            case 'user':
                const user = await interaction.options.getUser('usuario');
                const member = await interaction.guild.members.fetch(user.id).catch(console.error);
                const embedUser = new EmbedBuilder()
                    .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
                    .setColor('Blurple')
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    .addFields([
                        {
                            name: 'Tag del usuario',
                            value: user.tag
                        },
                        {
                            name: 'ID del usuario',
                            value: user.id
                        },
                        {
                            name: 'Fecha de creación de la cuenta',
                            value: `${user.createdAt}`
                        },
                        {
                            name: 'Fecha de entrada al servidor',
                            value: `${member.joinedAt}`
                        },
                        {
                            name: 'Roles',
                            value: member.roles.cache.map(r => r).join(' ')
                        }
                        
                    ])
                    .setFooter({ text: `Información de ${user.tag} | ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) });

                interaction.reply({ embeds: [embedUser] });
                break;
            case 'bot':
                /* Bot Owner */
                let botOwner;
                await interaction.client.application.fetch();
                if (interaction.client.application.owner.tag === undefined) {
                    botOwner = await interaction.client.application.owner.members.get(process.env.ownerId);
                } else {
                    botOwner = interaction.client.application.owner.tag;
                }

                /* Node.JS version */
                const nodeVersion = (process.versions.node).toString();

                const embedBot = new EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setColor('Blurple')
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                    .addFields([
                        {
                            name: 'Nombre del bot',
                            value: client.user.tag
                        },
                        {
                            name: 'ID del bot',
                            value: client.user.id
                        },
                        {
                            name: 'Fecha de creación del bot',
                            value: `${client.user.createdAt}`
                        },
                        {
                            name: 'Versión del bot',
                            value: `v2.0.2`
                        },
                        {
                            name: 'Creador del bot',
                            value: `${botOwner.user.tag}`
                        },
                        {
                            name: 'Versión de Discord.JS utilizada',
                            value: `v14.9.1-dev.16827698-77191a2.0`
                        },
                        {
                            name: 'Versión de Node.JS utilizada',
                            value: `v${nodeVersion}`
                        },
                        {
                            name: 'Traducción de descripciones por',
                            value: 'https://deepl.com'
                        }
                    ])
                    .setFooter({ text: `Información del bot | ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
                
                interaction.reply({ embeds: [embedBot] });
                break;
            default:
                break;
        }
    }
}