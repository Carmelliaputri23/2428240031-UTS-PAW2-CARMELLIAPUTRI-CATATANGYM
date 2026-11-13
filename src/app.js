import express from 'express'
import apiRoutes from './routes/api.routes.js'
import requestLogger from './middlewares/requestLogger.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()

app.use(express.json())

app.use(requestLogger)

app.get('/welcome', (req, res) => {
    res.json({
        message: 'Welcome to Catatan Gym API'
    })
})

app.use('/api', apiRoutes)

// Route tidak ditemukan
app.use((req, res, next) => {
    const error = new Error('Route tidak ditemukan')
    error.status = 404
    next(error)
})

// Error handler
app.use(errorHandler)

export default app
