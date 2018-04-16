const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var router = express.Router();
const app = express()
const moment = require('moment');
const User = require('./model/user');
const Post = require('./model/post');
const HttpStatus = require('./http-status-code');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/posts', (req, res) => {
    Post.find().sort({ createdAt: -1 }).then(posts => {
        res.send(posts);
    });
});

mongoose.connect('mongodb://localhost:27017');
mongoose.Promise = require('bluebird');

router.get('/ping', (req, res) => {
    res.send('Hi');
});

router.post('/new-post', (req, res) => {
    let time = moment().format("YYYY-MM-DD h:mm:ss a");
    Post.create({ title: time }).then(p => {
        res.send(p);
    });
});

router.post('/delete-post', (req, res) => {
    Post.findOneAndRemove({ _id: req.body.params.postId }).then(post => {
        res.send(post);
    });
});

router.post('/update-post', (req, res) => {
    let post = req.body.params.post;
    Post.update({ _id: post.id }, post).then(r => {
        res.send("DONE");
    });
});

router.post('/login', (req, res) => {
    let user = req.body.params;

    User.findOne({ email: user.email }, (err, target) => {
        if (!target) {
            res.status(HttpStatus.UNAUTHORIZED).send("User Not Found");
            return;
        }

        target.comparePassword(user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                res.send({ token: target._id });
            } else {
                res.status(HttpStatus.UNAUTHORIZED).send("Wrong Password");
            }
        });
    });
});

router.post('/sign-up', (req, res) => {
    let user = req.body.params;

    if (!user.email || !user.password) {
        res.status(HttpStatus.BAD_REQUEST).send("Email/password is invalid");
        return;
    }

    User.findOne({ email: user.email }, (err, target) => {
        if (target) {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).send("Email is invalid or already taken");
            return;
        }

        User.create(user).then(u => {
            res.send(u);
        });
    });
});

app.use('/api', router);
app.listen(3000, () => console.log('liuzhenglai.com listening on port 3000!'));