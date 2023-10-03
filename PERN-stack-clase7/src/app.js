import express from 'express'
import morgan from 'morgan'
import tareasRoutes from './router/tareas.routes.js'
import authRoutes from './router/auth.routes.js'

const app = express()

// Middlewares
// el modulo morgan en la configuracion dev, para ver mensajes más limpios en consola
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.json({ message: 'Bienvenidos a mi proyecto' }))
app.get('/test', (req, res) => {
  throw new Error('Error generado')
})
app.use('/api', tareasRoutes)
app.use('/api', authRoutes)

// Manejando errores
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: err.message
  })
})

export default app
