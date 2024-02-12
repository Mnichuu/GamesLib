const { queryAsync } = require('./database');
const { news2ArrayUnlogged } = require('./db2array');

async function addGameToVerification(gameID) {
    try {
        await queryAsync(`
        UPDATE games
        SET verified=0 
        WHERE gameID=?;`, 
        [gameID]);

        news2ArrayUnlogged();

        return { status: 200, message: 'Game send to verification'};
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

module.exports = {
    addGameToVerification
};