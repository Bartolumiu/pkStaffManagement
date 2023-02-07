const { Schema, model } = require('mongoose');
const guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    guildName: String,
    guildIcon: { type: String, required: false },
    serverRoleId: String,
    supportRoleId: Array,
    extraRoleId: Array,
    setupDate: String,
    welcomeChannelId: String,
    userRoleId: String,
    reportChannelId: String,
}, {
    versionKey: false
});

module.exports = model('Guild', guildSchema, 'guilds');
