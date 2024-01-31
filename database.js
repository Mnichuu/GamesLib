const {createConnection} = require('mysql');

const pool = createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "stream"
})

pool.query('select * from users', (err, result) => {
    if(err){
        return console.log(err);
    }
    return console.log(result);
})