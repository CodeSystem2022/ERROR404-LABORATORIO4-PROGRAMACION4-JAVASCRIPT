import pg from 'pg'

export const pool = new pg.Pool({
  port: 5432,
  host: 'localhost',
  user: 'postges',
  password: 'postgress', // Aca depende del password que tiene cada uno en su postgresql local, alguno puede tener admin por ej
  database: 'PERN'
})

pool.on('connect', () => {
  console.log('conectado a la base de datos')
})