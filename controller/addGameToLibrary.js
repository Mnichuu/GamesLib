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
        const games_number = await queryAsync(`
            SELECT COUNT(*) AS number_of 
            FROM library WHERE userID = ?`,
            [userID]);
        const is_downloaded = await queryAsync(`
            SELECT COUNT(*) AS games_downloaded 
            FROM library 
            WHERE isDownloaded = 1 AND userID = ?`,
            [userID]);
        await queryAsync(`
            UPDATE user_profile 
            SET  games_library = ?, games_downloaded = ? 
            WHERE userID = ?`,
            [games_number[0].number_of, is_downloaded[0].games_downloaded,userID]);

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