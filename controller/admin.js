const { queryAsync } = require('./database');
const fs = require ('fs');

async function addGame2Mysql (gameName, description) {
    try {
        await queryAsync(`
        INSERT INTO games (name, verified, description) 
        VALUES (?, 0, ?);`, 
        [gameName, description]);

        return {
            status: 200,
            message: 'Game added successfully',
            gameName: gameName,
            description: description
        }

    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}
module.exports={addGame2Mysql};