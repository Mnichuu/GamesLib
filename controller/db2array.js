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
module.exports={DB2Array};