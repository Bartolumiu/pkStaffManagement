const { ActivityType } = require('discord.js');

module.exports = (client) => {
    client.pickPresence = async (options) => {
        const ActivityOptions = [
            {
                type: ActivityType.Watching,
                text: 'Mantenimiento | v2.0.0',
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
