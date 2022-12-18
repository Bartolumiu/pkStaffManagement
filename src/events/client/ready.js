const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        setInterval(client.pickPresence, 10 * 1000);
        console.log(chalk.green(`[Event Handler] Ready as ${client.user.tag}`));
    }
}
