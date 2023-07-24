const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const oldclaimbutton = require('../../components/buttons/oldclaimbutton');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setuptag')
        .setDescription('Configuración slash etiqueta')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const embedTagES = new EmbedBuilder()
            .setAuthor({ name: `Rol del servidor`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setColor('Blurple')
            .setTitle('Rol del servidor')
            .setDescription('Para reclamar el rol del servidor, sigue las instrucciones de debajo.')
            .addFields([
                {
                    name: '1',
                    value: 'Ve a <#903208589030748240> y copia en tu nombre de usuario alguna de las etiquetas que aparecen.\nImportante, el bot no aceptará ninguna etiqueta que no aparezca en esa lista!'
                },
                {
                    name: '2',
                    value: 'Pulsa en el botón de abajo para recibir el rol del servidor.'
                }
            ])
            .setFooter({ text: `Rol del servidor | ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) });

        const embedTagEN = new EmbedBuilder()
            .setAuthor({ name: `Server role`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setColor('Blurple')
            .setTitle('Server role')
            .setDescription('To claim the server role, follow the instructions below.')
            .addFields([
                {
                    name: '1',
                    value: 'Go to <#903208589030748240> and copy in your username any of the tags that appear.\nNote that the bot will not accept any tag that does not appear in that list!'
                },
                {
                    name: '2',
                    value: 'Click on the button below to receive the server role.'
                }
            ])
            .setFooter({ text: `Server role | ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) });

        const claimButton = new ButtonBuilder()
            .setLabel('Claim')
            .setCustomId('claimbutton')
            .setStyle(ButtonStyle.Primary);

        const oldClaimButton = new ButtonBuilder()
            .setLabel('Old username format')
            .setCustomId('oldclaimbutton')
            .setStyle(ButtonStyle.Secondary);
        
        await interaction.channel.send({ embeds: [embedTagES, embedTagEN], components: [ new ActionRowBuilder().addComponents(claimButton), new ActionRowBuilder().addComponents(oldClaimButton) ] })
        await interaction.reply({ content: 'Sistema de etiquetas configurado correctamente.', ephemeral: true });
    }
}