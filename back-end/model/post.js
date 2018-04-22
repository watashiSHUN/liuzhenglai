const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String
    },
    tags: [{
        type: String
    }]
},
    { timestamps: true });

PostSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Post', PostSchema)