const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  body: String,
  createdAt: String,
  user: {
    type: Schema.ObjectId,
    ref: 'users'
  }, 
  comments: [
    {
      body: String,
      user: {
        type: Schema.ObjectId,
        ref: 'users'
      },
      likes: [
        {
          createdAt: String,
          user: {
            type: Schema.ObjectId,
            ref: 'users'
          }, 
        }
      ],
      createdAt: String
    }
  ],
  likes: [
    {
      createdAt: String,
      user: {
        type: Schema.ObjectId,
        ref: 'users'
      }, 
    }
  ]
})

module.exports = model('Post', postSchema);