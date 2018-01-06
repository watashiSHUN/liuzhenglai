const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
var router = express.Router();
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.post('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        res.send(posts);
    })
})

mongoose.connect('mongodb://localhost:27017')
mongoose.Promise = require('bluebird')
var Schema = mongoose.Schema

var PostSchema = new Schema({
    title: String,
    content: String,
    tags: [{
        type: String
    }]
},
{ timestamps: true })
PostSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 
const Post = mongoose.model('Post', PostSchema)

router.post('/new_post', (req, res) => {
    Post.create({ title: "123", content: "hhhh" }).then(p => {
        console.log(p)
        res.send(p)
    })
})

router.post('/delete_post', (req, res) => {
    Post.findOneAndRemove({ _id: req.body.params.postId }).then(post => {
        res.send(post)
    })
})

app.use('/api', router);
app.listen(3000, () => console.log('liuzhenglai.com listening on port 3000!'))