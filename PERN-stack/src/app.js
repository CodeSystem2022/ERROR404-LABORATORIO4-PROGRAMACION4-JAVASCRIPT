import express from 'express'
import morgan from 'morgan'
import tareasRoutes from './router/tareas.routes.js'
import authRoutes from './router/auth.routes.js'

const app = express()

/* * * * * *  Middleware  * * * * * * * * */
// el modulo morgan en la configuracion dev, para ver mensajes más limpios en consola
app.use(morgan('dev'))
// para pasarlo a formato JSON
app.use(express.json())
// usando de express urlencoded
app.use(express.urlencoded({ extended: false }))


/* * * * * * *  Rutas  * * * * * * * * */
app.get('/', (req, res) => res.json({ message: 'Bienvenidos a mi proyecto' }))
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
