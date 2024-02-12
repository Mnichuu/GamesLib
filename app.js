const express = require('express');
const path = require("path");
const dotenv = require('dotenv');

const { registerUser } = require('./controller/register');
const { loginUser } = require('./controller/login');
const { DB2Array, news2Array, 
    news2ArrayUnlogged, library2Array } = require('./controller/db2array');
const { addGame2Mysql } = require('./controller/admin');
const { addGameToLibrary } = require('./controller/addGameToLibrary');
const { verifyGame } = require('./controller/verifyGame');

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
    const result = await registerUser(name, email, password, password_confirm);
    
    if(result.status === 200) {
        res.redirect("/");
    } else {
        res.redirect("/views/registration");
    }
});

app.post("/auth/login", async (req, res) => {
    const { name, password } = req.body;
    const result = await loginUser(name, password);

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
    const cookieHeader = req.headers.cookie;

    if(!cookieHeader || !cookieHeader.includes('userId=')) {
        news2ArrayUnlogged();
        res.redirect("/views/news");
        return;
    }

    const userID = req.headers.cookie.split('; ')
        .find(row => row.startsWith('userId='))
        .split('=')[1];
    
    news2Array(userID);
    res.redirect("/views/news");
});

app.post("/auth/yourGames", async (req, res) => {
    const userID = req.headers.cookie.split('; ')
        .find(row => row.startsWith('userId='))
        .split('=')[1];
    
    library2Array(userID);

    res.redirect("/views/yourGames");
});

// TODO: dodanie osobnego pliku z tablicą i inne query dla profilu
app.post("/auth/profile", async (req, res) => {
    DB2Array("SELECT * FROM user_profile", '', "page_profile.js");
    res.redirect("/views/profile");
});

app.post("/auth/verification", async (req, res) => {
    DB2Array(`
    SELECT * FROM games 
    WHERE verified = ?`, 
    [0], "page_verification.js");

    res.redirect("/views/verification");
});

app.post("/add-game", async (req, res) => {
    const { name, description } = req.body;
    addGame2Mysql(name, description);
    res.redirect("/views/admin");
});

app.post("/add-game-library", async (req, res) => {
    const { gameID } = req.body;
    const userID = req.headers.cookie.split('; ')
        .find(row => row.startsWith('userId='))
        .split('=')[1];
    addGameToLibrary(gameID, userID);
    res.redirect("/views/news");
});

app.post("/verify-game", async (req, res) => {
    const { name } = req.body;
    verifyGame.verifyGame(name);
    DB2Array("SELECT * FROM games WHERE verified = '0'", '', "page_verification.js");
    res.redirect("/views/verification");
});

app.listen(5000, () => {
    console.log("server started on port 5000");
});
