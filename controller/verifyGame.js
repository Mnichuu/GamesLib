const { queryAsync } = require('./database');
const { news2ArrayUnlogged } = require('./db2array');

async function verifyGame(name) {
    try {
        await queryAsync(`
        UPDATE games SET verified = '1' WHERE name = ?`, [name]);

        news2ArrayUnlogged();

        return { status: 200, message: 'Game: '+name+', status = verified'};
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error. Game: '+name+', status = unverified' };
    }
}

module.exports = {
    verifyGame
};