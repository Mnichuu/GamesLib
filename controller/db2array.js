const { queryAsync } = require('./database');
const fs = require ('fs');

async function DB2Array (query, values, fileName) {
    try {
        const result = await queryAsync(query, values);

        if (result.length === 0) {
            fs.writeFileSync("public/code/" + fileName, '');
            return { status: 403, message: 'No values in that table.' };
        }

        const gamesData = [];
        if (result) {
            for (let i = 0; i < result.length; i++) {
                let row = result[i];
                gamesData.push(row);
            }
        }

        let jsonData = JSON.stringify(gamesData, null, 2);
        fs.writeFileSync("public/code/" + fileName, `const gamesData = ${jsonData};`);

        return gamesData;
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

function news2Array (userID) {
    try {
        DB2Array(`
            SELECT games.gameID, games.name, games.description, library.isDownloaded 
            FROM games
            LEFT JOIN library ON games.gameID = library.gameID
                            AND library.userID = ? 
            WHERE verified = ?;`, 
            [userID,1], "page_news.js");
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

function news2ArrayUnlogged () {
    try {
        DB2Array(`
            SELECT * FROM games 
            WHERE verified = ?;`, 
            [1], "page_news.js");
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

function library2Array (userID) {
    try {
        DB2Array(`
            SELECT * FROM library 
            JOIN games ON library.gameID = games.gameID 
            WHERE userID=?`, 
            [userID], "page_yourGames.js");
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

function profile2Array (userID) {
    try {
        DB2Array(`
            SELECT * FROM user_profile 
            WHERE userID=?`, 
            [userID], "page_profile.js");
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

module.exports={
    DB2Array,
    news2Array,
    news2ArrayUnlogged,
    library2Array,
    profile2Array
};