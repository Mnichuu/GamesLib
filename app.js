const express = require('express');
const path = require("path");
const register = require('./controller/register');
const login = require('./controller/login');
const shop = require('./controller/shop');
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
    }
});

app.post("views/news", async (req, res) => {
    const result = await shop.getAllGames();

    if (result.status === 200) {
        console.log(result.message);
    }
});

app.listen(5000, () => {
    console.log("server started on port 5000");
});
