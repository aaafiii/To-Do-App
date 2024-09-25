const express = require('express');
const app = express();
const path = require('path');
const port = 8000;
const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser')

const { connectDB } = require('./connection.js');
const todoRouter = require('./routes/todo.js')
const userRouter = require('./routes/user.js')
const staticRouter = require('./routes/staticRoute.js')

const { checkForAuthentication, restrictTo } = require('./middlewares/auth.js')

connectDB("mongodb://localhost:27017/todo-app")
    .then(() => {
        console.log("Mongodb Connected")
    }).catch((err) => {
        console.log(err);
    });


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication)

app.use('/todo', restrictTo(['NORMAL', 'ADMIN']), todoRouter);
app.use('/user', userRouter);
app.use('/', staticRouter);

app.listen(port, (err) => {
    if (err) {
        console.log("error is ", err);
    }
    else {
        console.log("Successfully running on port", port);
    }
})