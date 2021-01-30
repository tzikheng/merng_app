const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User.js')
const checkAuth = require('../../utility/check-auth.js')
const { SECRET_KEY } = require('../../config.js')
const { validateRegisterInput, validateLoginInput } = require('../../utility/validators.js')

function generateToken(user){
  return jwt.sign(
    {id: user.id, avatar: user.avatar, bio: user.bio, color: user.color, username: user.username},
    SECRET_KEY, 
    { expiresIn: '7d'})
}

module.exports = {
  Query: {
    async getUser(_, { userId }){
      try{
        const user = await User.findById(userId)
        return user
      } catch(err){
        throw new Error(err)
      }
    },
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
    async register(_, {registerInput:{username, email, password, confirmPassword}}){
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
          avatar: 'https://semantic-ui.com/images/avatar2/large/elyse.png',
          bio: '',
          createdAt: new Date().toISOString(),
          color: 'orange',
          email,
          password,
          username,
          cart: []
        })
        const res = await newUser.save()
        const token = generateToken(res)
        return{
          ...res._doc,
          id: res._id,
          avatar: res.avatar,
          bio: res.bio,
          createdAt: res.createdAt,
          color: res.color,
          email: res.email,
          token: token,
          username: res.username,
          cart: res.cart
        }
      }
    },

    async login(_, {username, password}){
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
        ...user._doc,
        id: user._id,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt,
        color: user.color,
        email: user.email,
        token: token,
        username: user.username,
        cart: user.cart
      }
    },

    async updateSettings(_, {settingsInput:{avatar, bio, color, username}}, context){
      const this_user = checkAuth(context)
      const user = await User.findById(this_user.id)
      if (!username || username.length===0){
        username=user.username
      } else {
        if (username !== user.username){
          const existing_user = await User.findOne({ username })
          if(existing_user){
            throw new UserInputError('Username is taken', {
              errors:{username: 'This username is taken'}
            })
          }
        }
      }
      user.avatar = avatar||user.avatar,
      user.bio = bio||user.bio,
      user.color = color||user.color,
      user.username = username
      await user.save()
      const token = generateToken(user)
      return{
        ...user._doc,
        id: user._id,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt,
        color: user.color,
        email: user.email,
        token: token,
        username: user.username,
        cart: user.cart
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