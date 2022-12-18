const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const mongoose = require('mongoose');

/* Import MongoSB Schemas */
const User = require('../../schemas/user');
const Guild = require('../../schemas/guild');

/* Slash Command */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Configuración inicial del servidor.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
        if (!guildProfile) {
            await interaction.reply({ content: `Setting up ${interaction.guild.name}`, fetchReply: true });
            guildProfile = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildId: interaction.guild.id,
                guildName: interaction.guild.name,
                guildIcon: interaction.guild.iconURL() ? interaction.guild.iconURL() : 'None.',
                setupDate: Date.now(),
		supportRoleId: [],
		serverRoleId: ''
            });
            console.log(`Setting up ${interaction.guild.name}`);
            interaction.editReply({ content: `Saving data...`});
            await guildProfile.save().catch(console.error);
            interaction.editReply({ content: `Setup done for guild ${interaction.guild.name}` });
        } else {
            console.log(`${interaction.guild.name} already setup.`);
            interaction.reply(`Guild ${interaction.guild.name} has already done setup.`);
        }
    }
}
