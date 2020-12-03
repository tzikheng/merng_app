const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  body: String,
  // user_id: String,
  username: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }, 
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    }
  ]
})

module.exports = model('Post', postSchema);