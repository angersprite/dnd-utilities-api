import express from 'express'
import cors from 'cors'
import fs from 'fs'
import * as goonrDAO from './goonrDAO.js'
import generateNPC from './npcGenerator.js'
import {} from 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json()) 
const port = process.env.API_PORT

app.get('/numbers', (req, res) => {
    let numbers = [];
    for (let i = 0; i < 10; i++) {
        numbers.push(Math.round(Math.random()* 100))
    }
    res.send(numbers)
})

app.get('/classes', async (req, res) => {
    let Class = await goonrDAO.getClass()
    res.send(Class)
})

app.get('/classes/:id', async (req, res) => {
    let Class = await goonrDAO.getClass(req.params.id)
    res.send(Class)
})

app.get('/races', async (req, res) => {
    let Race = await goonrDAO.getRace()
    res.send(Race)
})

app.get('/races/:id', async (req, res) => {
    let Race = await goonrDAO.getRace(req.params.id)
    res.send(Race)
})

app.get('/npc', async (req, res) => {
    let NPC = await generateNPC(-1, -1)
    res.send(NPC)
})

app.post('/npc', async (req, res) => {
    let NPC = await generateNPC(req.body.classID, req.body.raceID)
    res.send(NPC)
})

app.listen(port, () => {
    console.log(`Goonr API listening on port ${port}`)
})