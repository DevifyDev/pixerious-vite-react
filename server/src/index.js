import express from 'express'
import cors from 'cors'
import { PrismaClient } from '../generated/prisma/index.js'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        status: "API running"
    })
})

const PORT = 3000

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`)
})