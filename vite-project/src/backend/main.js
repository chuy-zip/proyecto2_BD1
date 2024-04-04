import express from 'express'
import cors from 'cors'
import { getUsers } from './db.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))

app.get('/users', async (req, res) => {
    try {
        const users = await getUsers()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'})
    }
})

app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`)
})