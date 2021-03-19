const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("Welcome to our web app!")
})

app.listen(7000)