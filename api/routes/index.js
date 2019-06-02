var express = require('express')
var router = express.Router()

//controllers
// var ctrlVideo = require('../controllers/videos')
// var ctrlSearch = require('../controllers/search')
var ctrlVotes = require('../controllers/voteController')

//GET routes
// router.get('/videos', ctrlMovies.videoSearch)
// router.get('/videos/:search', ctrlMovies.videoSearch )

//POST routes
router.post('/rate', ctrlVotes.countVotes)
router.post('/movie/rate', ctrlVotes.saveVote)

module.exports = router
