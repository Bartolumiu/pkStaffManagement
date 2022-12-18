const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    userName: String,
    userAvatar: { type: String, required: false },
    isPremium: Boolean
}, {
    versionKey: false
});

module.exports = model('User', userSchema, 'users');