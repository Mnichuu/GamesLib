const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'stream'
});



pool.execute(sql, function(err, result) {
    if (err) throw err;

    console.log(result);
});

module.exports = pool.promise();