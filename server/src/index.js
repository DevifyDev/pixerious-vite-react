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

app.get('/articles', async (req, res) => {
    try {
        const articles = await prisma.article.findMany()
        res.json(articles)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to fetch articles'})
    }
})

app.get('/articles/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const article = await prisma.article.findUnique({
            where: { id }
        })
        if (!article) {
            return res.status(404).json({
                error: 'Article not found'
            })
        }
        res.json(article)
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch article'})
    }
})

const PORT = 3000

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`)
})