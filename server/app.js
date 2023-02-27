const express = require('express')
require('./db/conn.js')

const app = express();

app.use(express.json());
const User=require('./model/userSchema.js');

app.use(require('./router/auth.js'));


//middleware
const middleware = (req, res, next) => {
    console.log("hello middleware");
}

middleware();

app.get('/', (req, res) => {
    res.send("Hello world from tushar go")
});

app.get('/about', (req, res) => {
    res.send("Hello world from about");
});

app.get('/contact', (req, res) => {
    res.send("Hello world from contact");
});

app.get('/signUp', (req, res) => {
    res.send("Hello world from signUp");
});

app.get('/signIn', (req, res) => {
    res.send("Hello world from signIn");
});

app.listen(8080, () => {
    console.log("app is listening");
})