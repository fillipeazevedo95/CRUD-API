import bcrypt from 'bcrypt'

export const encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(Number(process.env.SALT))
  password = await bcrypt.hash(password, salt)
  return password
}
