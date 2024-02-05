const express = require('express');
const path = require("path");
const register = require('./controller/register');
const login = require('./controller/login');
const db2array = require('./controller/db2array');
const dotenv = require('dotenv');

const app = express();
dotenv.config({ path: './.env' });
app.set('view engine', 'hbs');

const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/auth/register", async (req, res) => {
    const { name, email, password, password_confirm } = req.body;
    const result = await register.registerUser(name, email, password, password_confirm);
    
    if(result.status === 200) {
        res.redirect("/");
    } else {
        res.redirect("/views/registration");
    }
});

app.post("/auth/login", async (req, res) => {
    const { name, password } = req.body;
    const result = await login.loginUser(name, password);

    if (result.status === 200) {
        result.cookies.forEach(cookie => {
            res.cookie(cookie.name, cookie.value, cookie.options);
        });
        res.redirect("/");
    } else {
        res.redirect("/views/loggin");
    }
});

app.post("/auth/news", async (req, res) => {
    const result = db2array.DB2Array("SELECT * FROM games WHERE verified = '1'", '', "page_news.js");
    res.redirect("/views/news");
});

app.post("/auth/yourGames", async (req, res) => {
    const result = db2array.DB2Array("SELECT * FROM library JOIN games ON library.gameID = games.gameID", '', "page_yourGames.js");
    res.redirect("/views/yourGames");
});

// TODO: dodanie osobnego pliku z tablicą i inne query dla profilu
app.post("/auth/profile", async (req, res) => {
    const result = db2array.DB2Array("SELECT * FROM user_profile", '', "page_profile.js");
    res.redirect("/views/profile");
});
app.listen(5000, () => {
    console.log("server started on port 5000");
});
