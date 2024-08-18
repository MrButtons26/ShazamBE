const express = require('express')
const app = require('./server')
const cors = require('cors')
const morgan = require('morgan')
const userRouter = require('./routes/userRouter')
const bookmarkRouter = require('./routes/bookmarkRouter')
const playListRouter = require('./routes/playListRouter.js')


app.use(express.json());
app.use(morgan('tiny'))
app.use(cors())
app.get(`/`, (req, res) => {
    res.status(200).send(`hello`)
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/bookmark', bookmarkRouter)
app.use('/api/v1/playlist', playListRouter)