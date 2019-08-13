

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/task-DB', {
    useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', function (err) {
    console.log('connection error', err)
});
db.once('open', function () {
    console.log(' database connected.');
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
    uname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password_again: { type: String, required: true }

});
var User = mongoose.model('User', userSchema);


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/Home', function (req, res) {
    console.log("home path...", path.join(__dirname, 'Home.html'))
    res.sendFile(path.join(__dirname, 'Home.html'));

});

app.get('/login', function (req, res) {

    res.sendFile(path.join(__dirname, 'login.html'));

});

app.get('/forgot-password', function (req, res) {

    res.sendFile(path.join(__dirname, 'forgot-password.html'));
});

app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/parse', function (req, res) {
    console.log("......................enter page................");

    var newUser = new User()
    newUser.uname = req.body.name,
        newUser.email = req.body.email,
        newUser.password = req.body.password,
        newUser.password_again = req.body.password_again

    newUser.save(function (err, data) {
        if (err) console.log(err);
        else console.log('Saved : ', data);
    });



});
app.post('/check', function (req, res) {
    console.log("login check starts");
    var value = {
        email: req.body.email,
        password: req.body.password,
    };
    // console.log("............", value.email);
    // console.log("............", value.password);
    User.findOne({
        email: req.body.email,
        password: req.body.password
    },
        function (err, result) {
            if (err) {
                console.log("invalid user name or password");
            }
            var val = { name: 'sucessfull login' };
            res.send(val);

        });
});



console.log("connect to server");
app.listen(8080);


