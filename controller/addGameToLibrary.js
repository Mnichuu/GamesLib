const { queryAsync } = require('./database');

async function addGameToLibrary(gameID, userID) {
    try {
        await queryAsync(`
        INSERT INTO library (userID, gameID, isDownloaded) 
        VALUES (?, ?, ?);`, 
        [userID, gameID, 0]);

        return { status: 200, message: 'Game added to library'};
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

module.exports = {
    addGameToLibrary
};