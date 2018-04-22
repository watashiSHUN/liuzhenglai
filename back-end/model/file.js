const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    data: {
        type: Schema.Types.Buffer,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    }
},
    { timestamps: true });

module.exports = mongoose.model('File', FileSchema);