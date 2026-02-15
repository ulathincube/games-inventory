import express from 'express'
import indexRouter from './routes/index.js'
import gamesRouter from './routes/games.js'
import notFound from './errors/notFound.js'
import errorHandler from './errors/errorHandler.js'
import cors from 'cors'

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/games', gamesRouter)
app.use(indexRouter)

app.use('/*splat', notFound)
app.use(errorHandler)

export default app
