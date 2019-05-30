var mongoose = require('mongoose')

var VoteModel = new mongoose.Schema({
    
    movie_id : String,
    rate     : Number

}, {
    collection: 'movie-votes'
})

var VoteModel = module.exports = mongoose.model('VoteModel', VoteModel)
