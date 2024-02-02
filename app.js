const express = require('express');
const mysql = require("mysql");
const dotenv = require('dotenv');
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
dotenv.config({ path: './.env' });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'stream'
});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL connected!");
    }
});

app.set('view engine', 'hbs');

const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

function queryAsync(query, values) {
    return new Promise((resolve, reject) => {
        db.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

app.post("/auth/register", async (req, res) => {
    const { name, email, password, password_confirm } = req.body;

    try {
        const result = await queryAsync('SELECT login FROM user_credentials WHERE login = ?', [name]);

        if( result.length > 0 ) {
            return res.status(403).json({ message: 'This email is already in use' });
        } else if(password != password_confirm) {
            return res.status(403).json({ message: 'Passwords do not match!' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await queryAsync('INSERT INTO user_credentials (login, email, password, userTypeID) VALUES (?, ?, ?,3)', [name, email, hashedPassword]);

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post("/auth/login", async (req, res) => {
    const { name, password } = req.body;

    try {
        const result = await queryAsync('SELECT userID, userTypeID, password FROM user_credentials WHERE login = ?', [name]);
        
        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid login credentials' });
        }

        const user = result[0];
        const hashedPassword = user.password

        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid login credentials' });
        }
            
        console.log('User logged in successfully');

        const d = new Date();
        d.setTime(d.getTime() + (30 * 60 * 1000));
        res.cookie("userId", user.userID, { expires: d, path:'/' });
        res.cookie("userType", user.userTypeID, { expires: d, path:'/' });
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(5000, () => {
    console.log("server started on port 5000");
});
