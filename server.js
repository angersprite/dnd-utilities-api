const express = require('express')
const app = express()
const port = 3000

app.get('/numbers', (req, res) => {
    let numbers = [];
    for (i = 0; i < 10; i++) {
        numbers.push(Math.round(Math.random()* 100))
    }
    res.send(numbers)
})

app.listen(port, () => {
    console.log(`Goonr API listening on port ${port}`)
})