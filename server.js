import express from 'express'
import cors from 'cors'
import fs from 'fs'
import * as goonrDAO from './goonrDAO.js'
import generateNPC from './npcGenerator.js'
import * as userDAO from './userDAO.js'
import {} from 'dotenv/config'
import morgan from 'morgan'

import { sendEmail } from './emailService.js' 

const app = express()
app.use(cors())
app.use(express.json()) 
const port = process.env.API_PORT

app.use(morgan('tiny'));

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

app.post('/register', async (req, res) => {
    let isRegistered = await userDAO.registerUser(req.body.userName, req.body.email, req.body.password)
    res.send(isRegistered)
})

app.post('/confirmEmail', async (req, res) => {
    let isConfirmed = await userDAO.confirmEmail(req.body.email)
})

app.post('/login', async (req, res) => {
    let isLoggedIn = await userDAO.tryLogin(req.body.userName, req.body.password)
    res.send(isLoggedIn)
})

app.get('/getUserProfile', async (req, res) => {
    let userProfile = await userDAO.getUserProfile(req.body.userID)
    res.send(userProfile)
})

app.get('/resetPWEmail', async (req, res) => {
    let emailSent = await userDAO.resetPasswordEmail(req.body.userName)
    res.send(emailSent)
})

app.get('/updatePW', async (req, res) => {
    let passwordUpdated = await userDAO.updatePassword(req.body.resetToken, req.body.userName, req.body.newPassword)
    res.send(passwordUpdated)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})