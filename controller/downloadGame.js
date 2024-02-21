const { queryAsync } = require('./database');
const {library2Array, profile2Array} = require("./db2array");


async function downloadGame(gameID,  userID) {
    try {
        await queryAsync(`
            UPDATE library SET isDownloaded = 1 WHERE gameID = ? AND userID = ?;`, [gameID, userID]);
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


        library2Array(userID);
        profile2Array(userID);

        return { status: 200, message: 'Game: '+gameID+', status = downloaded'};
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error. Game: '+gameID+', status = undownloaded' };
    }
}

module.exports = {
    downloadGame
};