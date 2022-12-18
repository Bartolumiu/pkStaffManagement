const chalk = require('chalk');

module.exports = {
    name: 'debug',
    execute(info) {
        console.log(chalk.gray(`[Debug] ${info}`));
    }
}