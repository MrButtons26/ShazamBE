const express = require('express')
const app = express();
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

async function wrapper() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.bhlhk.mongodb.net`)
        console.log('connected to DB')
    }
    catch (e) {
        console.log(e)

    }
}
wrapper();

app.listen(process.env.PORT, () => {
    console.log('Listening at port : 3000')
})


module.exports = app;