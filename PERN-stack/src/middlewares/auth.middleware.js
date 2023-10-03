import jwt from 'jsonwebtoken'

export const isAuth = (req, res, next) => {
  const token  = req.cookies.token

  // Si no tiene token no esta autorizado como usuario
  if(!token) {
    return res.status(401).json({
      message: 'Usuario no autorizado'
    })
  }

  jwt.verify(token, 'xyz123', (err, decoded) => {
    // Si hay error al leer el token
    if(err) {
      return res.status(401).json({
        message: 'Usuario no autorizado'
      })
    }

    req.usuarioId = decoded.id
    next()
  })
}