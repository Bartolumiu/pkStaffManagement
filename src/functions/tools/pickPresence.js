const { ActivityType } = require('discord.js');

module.exports = (client) => {
    client.pickPresence = async (options) => {
        const ActivityOptions = [
            {
                type: ActivityType.Watching,
                text: 'Pokémon Kingdom | v2.0.2',
                status: 'ONLINE'
            },
            {
                type: ActivityType.Watching,
                text: 'Staff | v2.0.2',
                status: 'ONLINE'
            },
        ];
        const option = Math.floor(Math.random() * ActivityOptions.length);

        client.user.setPresence({
            activities: [
                {
                    name: ActivityOptions[option].text,
                    type: ActivityOptions[option].type,
                },
            ],
            status: ActivityOptions[option].status,
        });
    };
};
