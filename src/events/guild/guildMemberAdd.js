const { EmbedBuilder } = require('discord.js');

const Guild = require('../../schemas/guild');
const mongoose = require('mongoose');

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        let guildProfile = Guild.findOne({ guildId: member.guild.id });
        if (!guildProfile) {
            return console.log(`[Welcomer Module] Alguien se ha unido, pero no hay ningún canal configurado...`);
        }
        const channel = member.guild.channels.cache.find(ch => ch.id === guildProfile.welcomeChannelId);
        if (!channel) return console.log(`[Welcomer Module] Alguien se ha unido, pero no se ha encontrado el canal...`);
        const embedMiembro = new EmbedBuilder()
            .setTitle('🔒◞・Nuevo miembro')
            .setDescription(`${member} se unió al servidor!`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('#00ff00');
        channel.send({ embeds: [embedMiembro] });
    }
}
