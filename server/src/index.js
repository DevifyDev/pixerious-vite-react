import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

prisma.$connect()
  .then(() => console.log('Prisma connected'))
  .catch(err => console.error('Prisma connection error:', err))

app.use(cors({
    origin: ['http://localhost:5173','https://www.pixerious.com', 'https://pixerious.com']
}))
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

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
    console.log(`Server running on port:${PORT}`)
})

process.on('SIGINT', async () => {
    await prisma.$disconnect()
    process.exit(0)
})

process.on('SIGTERM', async () => {
    await prisma.$disconnect()
    process.exit(0)
})