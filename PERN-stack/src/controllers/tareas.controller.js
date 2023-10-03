import { pool } from '../db.js'

// Lista las tareas ya creadas
export const listarTareas = async (req, res) => {
  console.log('Usuario autorizado: ', req.usuarioId)

  const result = await pool.query('SELECT * FROM tareas')
  console.log('Tareas: ', result)
  
  return res.send(result.rows)
}

// Para obtener una tarea unica
export const listarTarea = async (req, res) => {
  console.info('Obteniendo tarea unica')

  const id = req.params.id
  const resultado = await pool.query('SELECT * FROM tareas WHERE id = $1', [id])

  // Si mando un id de una tarea que no tengo aviso
  if (resultado.rowCount === 0) {
    return res.status(404).json({
      message: `La tarea con id ${id}, no existe`
    })
  }

  return res.json(resultado.rows[0])
}

// Crear una nueva tarea, manejando errores
export const crearTarea = async (req, res, next) => {
  const { titulo, descripcion } = req.body

  try {
    const result = await pool.query(
      'INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2) RETURNNING *',
      [titulo, descripcion]
    )
    console.info('Creando tarea...')
    res.json(result.rows[0])
    console.log('Nueva tarea: ', result.rows[0])
  } catch (error) {
    console.error('Hubo un error: ', error)

    if (error.code === '23505') {
      return res.status(409).json({
        message: 'Ya existe una tarea con ese titulo'
      })
    }
    next(error)
  }
}

// Actualizar una tarea
export const actualizarTarea = async (req, res) => {
  const { titulo, descripcion } = req.body
  const id = req.params.id

  const result = await pool.query(
    'UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNNING *',
    [titulo, descripcion, id]
  )

  if(result.rowCount === 0 ) {
    return res.status(404).json({
      message: `No existe la tarea con el id: ${id}`
    })
  }

  return res.json(result.rows[0])
}

// Eliminar una determinada tarea
export const eliminarTarea = async (req, res) => {
  const id = req.params.id
  const result = await pool.query('DALETE FROM tareas WHERE id = $1', [id])

  // si quiero eliminar una tarea que no tengo en mi base de datos
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: `La tarea con id: ${id}, no existe`
    })
  }

  //return res.send(`Tarea ${id} eliminada`)
  return res.sendStatus(204)
}
