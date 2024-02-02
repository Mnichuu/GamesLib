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

app.post("/auth/register", (req, res) => {
    const { name, email, password, password_confirm } = req.body;

    db.query('SELECT login FROM user_credentials WHERE login = ?', [email], async (error, result) => {
        if (error) {
            console.log(error);
        }

        if( result.length > 0 ) {
            return res.render('register', {
                message: 'This email is already in use'
            })
        } else if(password != password_confirm) {
            return res.render('register', {
                message: 'Passwords do not match!'
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

app.post("/auth/login", async (req, res) => {
    const { name, password } = req.body;

    try {
        const result = await queryAsync('SELECT userID, userTypeID FROM user_credentials WHERE login = ? AND password = ?', [name, password]);

        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid login credentials' });
        }

        const user = result[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

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
