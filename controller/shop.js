const queryAsync = require('./database');

async function getAllGames() {
    try {
        const result = await queryAsync('SELECT * FROM games');

        if (result.length === 0) {
            return { status: 404, message: 'Invalid login credentials' };
        }
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

module.exports = {
    getAllGames
};