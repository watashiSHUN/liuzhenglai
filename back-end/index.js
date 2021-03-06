const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const app = express()
const moment = require('moment');
const User = require('./model/user');
const Post = require('./model/post');
// const File = require('./model/file');
const HttpStatus = require('./http-status-code');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const avatarUpload = multer({ dest: 'public/avatar/' });

// Setup passport strategy
const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'liuzhenglai';

const strategy = new JwtStrategy(jwtOptions, function (payload, done) {
    let id = payload.id;
    User.findById(id, (err, user) => {
        if (user) {
            done(null, { id });
        } else {
            done(null, false);
        }
    });
});

passport.use(strategy);
app.use(passport.initialize());

app.get('/', function (req, res) {
    res.json({ message: 'Express is up!' });
});

app.use(cors());
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017');
mongoose.Promise = require('bluebird');

router.get('/ping', (req, res) => {
    res.send('pong');
});

const authenticator = passport.authenticate('jwt', { session: false });
router.post(
    '/posts',
    (req, res) => {
        Post.find({ author: req.body.userId }).sort({ createdAt: -1 }).then(posts => {
            res.send(posts);
        });
    }
);

router.post(
    '/post',
    (req, res) => {
        Post.findById(req.body.postId).then(post => {
            res.send(post);
        });
    }
)

router.post(
    '/new-post',
    authenticator,
    (req, res) => {
        let time = moment().format('YYYY-MM-DD h:mm:ss a');
        Post.create({ title: time, author: req.user.id }).then(p => {
            res.send(p);
        });
    }
);

router.post(
    '/delete-post',
    authenticator,
    (req, res) => {
        Post.findByIdAndRemove(req.body.postId).then(post => {
            res.json({ message: 'ok' });
        });
    }
);

router.post('/update-post',
    authenticator,
    (req, res) => {
        let post = req.body.post;
        Post.update({ _id: post.id }, post).then(r => {
            res.json({ message: 'ok' });
        });
    }
);

function signTokenBack(user, res) {
    let payload = { id: user.id, avatar: user.avatar, email: user.email, name: user.name };
    let token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ message: 'ok', token: token });
}

router.post('/sign-in', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        res.status(HttpStatus.BAD_REQUEST).send('Invalid Request');
        return;
    }

    User.findOne({ email }, (err, user) => {
        if (!user) {
            res.status(HttpStatus.UNAUTHORIZED).send('User Not Found');
            return;
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                signTokenBack(user, res);
            } else {
                res.status(HttpStatus.UNAUTHORIZED).send('Wrong Password');
            }
        });
    });
});

function trim(str) {
    return str && str.trim();
}

router.post('/sign-up', (req, res) => {
    let name = trim(req.body.name);
    let email = trim(req.body.email);
    let password = req.body.password;

    if (!name || !email || !password) {
        res.status(HttpStatus.BAD_REQUEST).send('Email/password is invalid');
        return;
    }

    User.findOne({ email }, (err, target) => {
        if (target) {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).send('Email is invalid or already taken');
            return;
        }

        User.create({ name, email, password }).then(user => {
            signTokenBack(user, res);
        });
    });
});

router.post(
    '/upload-avatar',
    authenticator,
    avatarUpload.single('avatar'),
    (req, res) => {
        // Set { new: true } to return the updated one, rather than the original one.
        User.findByIdAndUpdate(req.user.id, { avatar: req.file.path }, { new: true }).then(user => {
            signTokenBack(user, res);
        });
    }
);

router.post(
    '/update-profile',
    authenticator,
    (req, res) => {
        User.findByIdAndUpdate(req.user.id, { name: req.body.name }, { new: true }).then(user => {
            signTokenBack(user, res);
        });
    }
);

app.use(express.static('public'));
app.use('/api', router);
app.listen(3000, () => console.log('liuzhenglai.com listening on port 3000!'));