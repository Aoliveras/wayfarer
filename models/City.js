const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    imageUrl: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
{ timestamps: true });

const citySchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    posts: [postSchema],
    imageUrl: String
});

const City = mongoose.model('City', citySchema);

module.exports = City;