const chalk = require('chalk');

module.exports = {
    name: 'err',
    execute(err) {
        console.log(chalk.bgRed(`[Database Status] An error occured with the database connection:\n${err}`));
    },
};