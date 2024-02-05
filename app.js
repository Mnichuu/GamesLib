const express = require('express');
const path = require("path");
const register = require('./controller/register');
const login = require('./controller/login');
const db2array = require('./controller/db2array');
const admin = require('./controller/admin');
const addToLibrary = require('./controller/addGameToLibrary');
const verifyGame = require('./controller/verifyGame');
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
    const cookieHeader = req.headers.cookie;

    if(!cookieHeader || !cookieHeader.includes('userId=')) {
        db2array.DB2Array(`SELECT * FROM games WHERE verified=?;`, [1], "page_news.js");
        res.redirect("/views/news");
        return;
    }

    const userID = req.headers.cookie.split('; ')
        .find(row => row.startsWith('userId='))
        .split('=')[1];
    
    db2array.DB2Array(`
        SELECT games.gameID, games.name, games.description, library.isDownloaded 
        FROM games
        LEFT JOIN library ON games.gameID = library.gameID
                        AND library.userID = ? 
        WHERE verified = ?;`, 
        [userID,1], "page_news.js");

    res.redirect("/views/news");
});

app.post("/auth/yourGames", async (req, res) => {
    const userID = req.headers.cookie.split('; ')
        .find(row => row.startsWith('userId='))
        .split('=')[1];
    
    db2array.DB2Array(`
        SELECT * FROM library 
        JOIN games ON library.gameID = games.gameID 
        WHERE userID=?`, 
        userID, "page_yourGames.js");

    res.redirect("/views/yourGames");
});

// TODO: dodanie osobnego pliku z tablicą i inne query dla profilu
app.post("/auth/profile", async (req, res) => {
    const result = db2array.DB2Array("SELECT * FROM user_profile", '', "page_profile.js");
    res.redirect("/views/profile");
});

app.post("/auth/verification", async (req, res) => {
    const result = db2array.DB2Array("SELECT * FROM games WHERE verified = '0'", '', "page_verification.js");
    res.redirect("/views/verification");
});
app.post("/add-game", async (req, res) => {
    const { name, description } = req.body;
    const result = await admin.addGame2Mysql(name, description);
    res.redirect("/views/admin");
});

app.post("/add-game-library", async (req, res) => {
    const { gameID } = req.body;
    const userID = req.headers.cookie.split('; ')
        .find(row => row.startsWith('userId='))
        .split('=')[1];
    await addToLibrary.addGameToLibrary(gameID, userID);
    res.redirect("/views/news");
});

app.post("/verify-game", async (req, res) => {
    const { name } = req.body;
    const result = await verifyGame.verifyGame(name);
    await db2array.DB2Array("SELECT * FROM games WHERE verified = '0'", '', "page_verification.js");
    res.redirect("/views/verification");
});

app.listen(5000, () => {
    console.log("server started on port 5000");
});
