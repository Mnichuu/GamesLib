const { queryAsync } = require('./database');
const {library2Array} = require("./db2array");

async function downloadGame(gameID,  userID) {
    try {
        await queryAsync(`
            UPDATE library SET isDownloaded = 1 WHERE gameID = ? AND userID = ?;`, [gameID, userID]);

        library2Array(userID);

        return { status: 200, message: 'Game: '+gameID+', status = downloaded'};
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error. Game: '+gameID+', status = undownloaded' };
    }
}

module.exports = {
    downloadGame
};