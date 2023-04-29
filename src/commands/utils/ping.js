const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Comprueba la latencia del bot')
        .setDescriptionLocalizations(
            {
                "en-GB": "Check bot latency",
                "en-US": "Check bot latency",
                "it": "Controllare la latenza del bot",
                "fr": "Vérifier la latence du bot",
                "pt-BR": "Verificar a latência do bot",
                "de": "Bot-Latenz prüfen",
                "no": "Sjekk bot-forsinkelse"
            }
        ),
    async execute(interaction, client) {
        const message = await interaction.deferReply({ fetchReply: true });

        const newEmbed = new EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setTitle('Pong!')
            .setColor('Blurple')
            .addFields([
                {
                    name: 'API Latency',
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: true
                },
                {
                    name: 'Client Latency',
                    value: `${message.createdTimestamp - interaction.createdTimestamp}ms`,
                    inline: true
                }
            ])
            .setFooter({ text: `Ping | ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

        await interaction.editReply({ content: interaction.user.mention, embeds: [newEmbed] });
    }
}