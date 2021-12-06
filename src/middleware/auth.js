import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token')
    if (!token) return res.status(403).send('Acess denied.')

    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).send('Invalid token')
  }
}
