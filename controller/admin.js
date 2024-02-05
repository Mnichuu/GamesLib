const { queryAsync } = require('./database');
const fs = require ('fs');

async function addGame2Mysql (gameName) {
    try {
        await queryAsync('INSERT INTO games (name, verified) VALUES (?, 0)', [gameName]);
        return {
            status: 200,
            message: 'Game added successfully',
            gameName: gameName,
        }

    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}
module.exports={addGame2Mysql};