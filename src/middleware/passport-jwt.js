require('dotenv').config()
const User = require('../models/User')
const passport = require('passport')
const JwtStrategy  = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
}
passport.serializeUser((user, done) => {
    console.log(`serialize ${user.id}`)
    done(null, user.id)
})

passport.use(
    new JwtStrategy(options, async(jwt_payload, done) => {
        const user = await User.findOne({id: jwt_payload.sub})
        if(!user) return done(null, false)
        return done(null, user)
    })
)