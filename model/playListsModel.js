const mongoose = require(`mongoose`);

const playListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `name for a playlist is compulsory`], maxlength: [20, `username must have less than or equal to 20 characters`],
        minlength: [4, `username must have less than or equal to 20 characters`]
    },
    songs: [{ type: String, trim: true }]

})

const PlayList = mongoose.model(`PlayList`, playListSchema);

module.exports = PlayList