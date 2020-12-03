const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

const { SECRET_KEY } = require('../config.js')

module.exports = (context) => {
  // context = { ... headers ... }
  const authHeader = context.req.headers.authorization
  if(authHeader){
    // convention when working with auth tokens: send header with "Bearer\ header"
    const token = authHeader.split('Bearer ')[1]
    if(token){
      try{
        const user = jwt.verify(token, SECRET_KEY)
        return user
      } catch(err){
        throw new AuthenticationError('Invalid/Expired token')
      }
    }
    throw new Error('Authentication token must be "Bearer [token]"')
  }
  throw new Error('Authentication header must be provided')
}