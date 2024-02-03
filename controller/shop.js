const queryAsync = require('./database');
const fs = require ('fs');

async function getAllGames() {
    try {
        const result = await queryAsync('SELECT gameID, name FROM games WHERE verified=TRUE;');

        if (result.length === 0) {
            return { status: 404, message: 'No validated games in database' };
        }

        const gamesData = `const gamesData = ${JSON.stringify(result, null, 2)};\n`;
        fs.writeFileSync('../public/code/shop_values.js', gamesData);

        return { status: 200, message: 'Data saved to /public/code/shop_values.js' };        
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

module.exports = {
    getAllGames
};