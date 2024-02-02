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
    database: 'gameslib'
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

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/auth/register", (req, res) => {
    const { name, email, password } = req.body;

    db.query('SELECT login FROM user_credentials WHERE login = ?', [email], async (error, result) => {
        if (error) {
            console.log(error);
        }

        if( result.length > 0 ) {
            return res.render('register', {
                message: 'This email is already in use'
            })
        }

        db.query('INSERT INTO user_credentials (login, email, password,userTypeID) VALUES (?, ?, ?,3)', [name, email, password], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return res.render('register', {
                    message: 'User registered!'
                });
            }
        });
    });
});

app.post("/auth/login", (req, res) => {
    const { name, password } = req.body;

    db.query('SELECT * FROM user_credentials WHERE login = ? AND password = ?', [name, password], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid login credentials' });
        }

        console.log('User logged in successfully');
        return res.status(200).json({ message: 'Logged in successfully' });
    });
});

app.listen(5000, () => {
    console.log("server started on port 5000");
});
