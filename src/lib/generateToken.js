import jwt from 'jsonwebtoken'

export const generateAuthToken = function (id) {
  const token = jwt.sign({ _id: id }, process.env.JWTPRIVATEKEY)
  return token
}
