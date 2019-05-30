var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var saltRounds = 10;
var jwt = require('jsonwebtoken')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

var userSchema = new mongoose.Schema({
    username: { 
        unique: true,
        type:String,
        required: [true, 'you must enter a valid username'],
        minlength: [5, 'you must enter at least 5 characters for this field']
    },
    email: { 
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        index:true,
        unique: true,
        sparse: true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    password: {type: String, required: true},
    nickname: String,
    preference: String,
    age: String,
    country: String,
    type: {
        type: Number,
        required: false,
        index: true,
        default: 0,
    }
}, {
    collection: 'users'
})

userSchema.pre('save', function(next) {
    var user = this

    if(!user.isModified('password')) return next()

    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err)

            user.password = hash
            next()
        })
    })
})

userSchema.methods.generateJwt = function() {
    var date = new Date()
    var calculateExpiresIn = (((date.getTime()) + (60 * 60 * 1000)) - (date.getTime() - date.getMilliseconds()) / 1000);
    // date.setDate(date.getDate() + 7)

    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        iat: (new Date().getTime()),
        exp: calculateExpiresIn
    }, 'my_secret')
}

var User = module.exports = mongoose.model('User', userSchema);