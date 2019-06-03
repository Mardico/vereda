var mongoose = require('mongoose')
var VoteModel = require('../models/VoteModel')

module.exports.saveVote = function(req, res, next) {

    var movieRate = new VoteModel()

    movieRate.rate = req.body.rate;   
    movieRate.movie_id = req.body.movie_id
    
    movieRate.save((err, result) => {
        if (err) {
            return res.status(404).json({
                message: 'failed to save movie rate'
            });
        }
        res.status(200).json({
            movieRate
        })
    })
}

module.exports.countVotes = function(req, res) {

    VoteModel.find({movie_id: req.query._id}, (err, rate) => {
        if(err){
            console.log('rate not found', err)
            return res.status(404).json({
                message: 'failed to get movie rate'
            })
        } else {
            res.status(200).json(rate);
        }
    })
}