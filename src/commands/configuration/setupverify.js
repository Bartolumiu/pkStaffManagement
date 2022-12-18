const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ActionRow } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setupverify')
        .setDescription('Configuración de verificación')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const embedVerificacion = new EmbedBuilder()
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setColor('Blurple')
            .setTitle('Verificación')
            .setDescription('Pulsa en el botón de abajo para acceder al servidor y demostrar que no eres un robot.')
            .setFooter({ text: `Sistema de Verificación | ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) });

        const verifButton = new ButtonBuilder()
            .setCustomId('verifybutton')
            .setLabel('Acceder al servidor')
            .setStyle(ButtonStyle.Primary);
        
        const rulesButton = new ButtonBuilder()
            .setLabel('Normas')
            .setURL('https://discord.com/channels/716661037297959004/866421350884048926')
            .setStyle(ButtonStyle.Link);
        
        const rolesButton = new ButtonBuilder()
            .setLabel('Autoroles')
            .setURL('https://discord.com/channels/716661037297959004/868492374370836500')
            .setStyle(ButtonStyle.Link);

        await interaction.channel.send({ embeds: [embedVerificacion], components: [ new ActionRowBuilder().addComponents(verifButton), new ActionRowBuilder().addComponents(rulesButton) ] });
        await interaction.reply({ content: 'Verificación configurada.', ephemeral: true });

    }
}