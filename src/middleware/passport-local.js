const User = require('../models/User')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser(async (userId, done) => {
    const user = await User.findByPk(userId);
    done(null, user)
})

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            const userDB = await User.findOne({ where:{ email: email}})
            return done(null, userDB)
        }
    )

)