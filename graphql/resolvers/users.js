const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { buildSchemaFromTypeDefinitions } = require('apollo-server')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User.js')
const { SECRET_KEY } = require('../../config.js')
const { validateRegisterInput, validateLoginInput } = require('../../utility/validators.js') // destructuring because it's not a default export

function generateToken(user){
  return jwt.sign(
    {id: user.id, email: user.email, username: user.username},
    SECRET_KEY, 
    { expiresIn: '1h'})
}

module.exports = {
  Query: {
    async getUsers(){
      try{
        const users = await User.find().sort({ createdAt: -1 }) // no condition, select *
        return users
      } catch(err){
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async login(_, {username, password}){ // no need to destructure them from type
      const {errors, valid} = validateLoginInput(username,password)
      if(!valid){
        throw new UserInputError('Wrong credentials',{errors})
      }
      const user = await User.findOne({username})
      if(!user){
        errors.general = 'User not found'
        throw new UserInputError('User not found',{errors})
      }
      const match = await bcrypt.compare(password, user.password)
      if(!match){
        errors.general = 'Wrong credentials'
        throw new UserInputError('Wrong credentials',{errors})
      }
      const token = generateToken(user)
      return{
        ...user._doc, // where the document is stored ??
        id: user._id,
        email: user.email,
        token: token,
        username: user.username,
        createdAt: user.createdAt
      }
    },

    async register(_, {registerInput:{username, email, password, confirmPassword}}){ // inputs: parent, args, context, info
      // Validate user data
      const {valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
      if(!valid){
        throw new UserInputError('Errors',{ errors })
      }
      // Make sure user doesn't already exist
      const user = await User.findOne({ username })
      if(user){
        throw new UserInputError('Username is taken',{
          errors:{username: 'This username is taken'}
        })
      } else {
        password = await bcrypt.hash(password, 12)
        const newUser = new User({
          email,
          username,
          password,
          createdAt: new Date().toISOString()
        })
        const res = await newUser.save() // to the DB
        const token = generateToken(res)
        return{
          ...res._doc, // where the document is stored ??
          id: res._id,
          email: res.email,
          token: token,
          username: res.username,
          createdAt: res.createdAt
        }
      }
    },

    async deleteAllUsers(){
      try{
        await User.deleteMany({})
        return 'Users deleted'
      } catch(err) {
        throw new Error(err)
      }
    }
  }
}