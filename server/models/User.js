const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  // objectId is auto generated by mongodb, do not specify here
  avatar: String,
  bio: String,
  color: String,
  createdAt: String,
  email: String,
  password: String,
  username: String,
})

module.exports = model('User', userSchema);