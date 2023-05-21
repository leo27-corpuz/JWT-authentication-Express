require('dotenv').config()
const express = require('express')
const passport = require('passport')
const app = express()
require('./src/config/connect')
require('./src/middleware/passport-jwt')

//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
//routes
const authRoute = require('./routers/api/authRoute')
app.use('/api/auth/', authRoute)
app.get('/post', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.send(`protected ${req.user.email}`);
})

const port = process.env.PORT || 8000
app.listen(port, ()=> {
    console.log(`running port ${port}`)
})