import express from "express"
import { createClient } from '@supabase/supabase-js'
import cors from 'cors'
const app = express()
app.use(cors())
const port = 3000

// move these to env
const supabaseProject = 'nlnfkvsjrayawvknouna'
const supabaseUrl = 'https://nlnfkvsjrayawvknouna.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sbmZrdnNqcmF5YXd2a25vdW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwNzM4MzEsImV4cCI6MjAxMjY0OTgzMX0.mZg7KIPxDqFzWKKgzWUsEseHNFXQEn8hkZqXdUd7OFU'
const supabase = createClient(supabaseUrl, supabaseAnonKey)


app.get('/numbers', (req, res) => {
    let numbers = [];
    for (let i = 0; i < 10; i++) {
        numbers.push(Math.round(Math.random()* 100))
    }
    res.send(numbers)
})

app.get('/classes', async (req, res) => {
    let { data: Class, error } = await supabase
        .from('Class')
        .select('*')
    console.log(Class)
    res.send(Class)
})

app.get('/classes/:id', async (req, res) => {
    let { data: Class, error } = await supabase
        .from('Class')
        .select('*')
        .filter('id', 'eq', req.params.id)
    console.log(Class)
    res.send(Class)
})

app.get('/races', async (req, res) => {
    let { data: Race, error } = await supabase
        .from('Race')
        .select('*')
    console.log(Race)
    res.send(Race)
})

app.get('/races/:id', async (req, res) => {
    let { data: Race, error } = await supabase
        .from('Race')
        .select('*')
        .filter('id', 'eq', req.params.id)
    console.log(Race)
    res.send(Race)
})

app.get('/npc', (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Goonr API listening on port ${port}`)
})