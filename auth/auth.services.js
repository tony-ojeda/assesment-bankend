const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config();
const { getUserByEmail } = require('../api/user/user.service')
const compose = require('composable-middleware')

function signToken(payload) {
  let token = '';
  try {
    token = jsonwebtoken.sign(payload, process.env.SECRET_KEY_JWT, {
      expiresIn: '1d'
    })
    
  } catch (err) {
    console.error('Error token: ', err)
  }

  return token
}

function isAuthenticated() {

  return compose().use(async (req, res, next) => {
    const authHeader = req.headers?.authorization
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const [, token] = authHeader.split(' ')
    const payload = await validateToken(token)
    if (!payload) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  
    const user = await getUserByEmail(payload.email)
  
    if (!user){
      return res.status(401).json({ message: 'User not found' })
    }
  
    req.user = user
    next()
  })
}

async function validateToken(token) {
  try {
    const payload = await jsonwebtoken.verify(token, process.env.SECRET_KEY_JWT)
    return payload
  } catch(err) {
    return null
  }
}

module.exports = {
  signToken,
  isAuthenticated,
}
