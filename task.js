

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


var Schema = mongoose.Schema;
var ur_schema = new Schema({
    id: { type: Number },
    name: { type: String, },
    owner: { type: String },
    url: { type: String },
    owner_id: { type: String }
});
var product_datas = mongoose.model('product_datas', ur_schema);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/Home', function (req, res) {

    res.sendFile(path.join(__dirname, 'Home.html'));

});

app.get('/login', function (req, res) {

    res.sendFile(path.join(__dirname, 'login.html'));

});
app.get('/edit', function (req, res) {

    res.sendFile(path.join(__dirname, 'edit.html'));
});
app.get('/insert', function (req, res) {

    res.sendFile(path.join(__dirname, 'insert.html'));
});


app.get('/forgot-password', function (req, res) {

    res.sendFile(path.join(__dirname, 'forgot-password.html'));
});

app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/register', function (req, res) {
    console.log("......................enter page................");
    var newUser = new User()
    newUser.uname = req.body.name,
        newUser.email = req.body.email,
        newUser.password = req.body.password,
        newUser.password_again = req.body.password_again
    if (newUser.password !== newUser.password_again) {
        return res.status(400).json("password not match");
    }
    else {
        User.findOne({
            email: req.body.email,
        }, function (err, docs) {
            if (err) {
                console.log('data finding error');
                return res.json({
                    "msg": "ERROR send message..."
                })

            }
            if (docs) {
                return res.status(302).json('email already exist');
            }
            else (!docs)
            {
                newUser.save(function (err, data) {
                    if (err) {
                        return res.status(400).send('db error');
                    };
                    res.status(200).send('saved in db');
                });

            }
        });
    }

});

app.post('/login', function (req, res) {
    console.log("login check starts");

    var dr = User.findOne({
        email: req.body.email,

    }, { uname: 1, password: 1 });

    dr.exec(function (err, dr1) {
        console.log(dr1);
        if (err) return res.send('error');
        else if (!dr1) {
            console.log("invalid user");
            return res.status(400).json('user not found');
        } else if (req.body.password !== dr1.password) {
            return res.status(400).json('invalid user name or passowrd');
        }
        else {
            console.log("login successfully");
            var dr2 = { _id: dr1._id, uname: dr1.uname };
            return res.status(200).json(dr2);
        }



    });
});

app.post('/insert', function (req, res) {


    var pro_user = new product_datas;
    console.log(pro_user);
    pro_user.id = req.body.product_id;
    pro_user.name = req.body.product_name;
    pro_user.owner = req.body.product_owner;
    pro_user.url = req.body.product_url;
    pro_user.owner_id = req.body.product_owner_id;

    console.log(".............data......");
    product_datas.findOne({ pro_id: 0 })
    pro_user.save(function (err, data) {

        if (err) {
            console.log(err);
            return res.status(400).send('db error');
        }
        else {
            console.log(data);
            return res.status(200).send('saved in db');
        }

    });
});

app.post('/Home', function (req, res) {
    console.log("enter home page");
    console.log(".................", req.body.id);
    var dar = product_datas.find({
        owner: req.body.name
    })

    dar.exec(function (err, docs) {
        if (err) {
            res.status(400).send('server not found');
        }
        else {
            console.log(docs);
            console.log("............product datas.............");
            return res.status(200).json(docs);
        }

    });
});

app.post('/edit', function (req, res) {
    console.log("enter edit page");
    var obj_id = req.body.id
    console.log(obj_id);
    product_datas.findOne({
        _id: obj_id
    }
        , (err, obj) => {
            if (err) {
                res.status(400).json(err);
                return;
            }
            else {
                console.log(obj);
                return res.status(200).json(obj);
            }
        });

});

app.post('/update', function (req, res) {
    product_datas.update({
        _id: req.body.id
    }, { $set: { name: req.body.name }, url: req.body.url }, (err, object) => {
        if (err) {
            res.status(400).send('msg:Server Error');
        }
        else {
            res.status(200).send('msg: Data update in database');
        }

    });
});

app.post('/delete', function (req, res) {
    console.log("enter delete row");
    var dataId = req.body.object_id
    console.log("....................delete", dataId);
    product_datas.remove({
        _id: dataId
    },
        (err, object) => {
            if (err) {
                res.status(400).send('msg:Server Error');
            }
            else {
                console.log("delete successully");
                res.status(200).send('msg: Data delete successfully');
            }
        }
    );


});

console.log("connect to server");
app.listen(8080);


