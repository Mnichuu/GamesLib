const { queryAsync } = require('./database');
const { DB2Array } = require('./db2array');

async function addGameToLibrary(gameID, userID) {
    try {
        await queryAsync(`
        INSERT INTO library (userID, gameID, isDownloaded) 
        VALUES (?, ?, ?);`, 
        [userID, gameID, 0]);

        DB2Array(`
        SELECT * FROM library 
        JOIN games ON library.gameID = games.gameID 
        WHERE userID=?`, 
        userID, "page_yourGames.js");

        DB2Array(`
        SELECT games.gameID, games.name, games.description, library.isDownloaded 
        FROM games
        LEFT JOIN library ON games.gameID = library.gameID
                        AND library.userID = ? 
        WHERE verified = ?;`, 
        [userID,1], "page_news.js");

        return { status: 200, message: 'Game added to library'};
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

module.exports = {
    addGameToLibrary
};