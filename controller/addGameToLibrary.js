const { queryAsync } = require('./database');
const { news2Array, 
        library2Array, 
        profile2Array } = require('./db2array');

async function addGameToLibrary(gameID, userID) {
    try {
        await queryAsync(`
        INSERT INTO library (userID, gameID, isDownloaded) 
        VALUES (?, ?, ?);`, 
        [userID, gameID, 0]);

        news2Array(userID);
        library2Array(userID);
        profile2Array(userID);

        return { status: 200, message: 'Game added to library'};
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

module.exports = {
    addGameToLibrary
};