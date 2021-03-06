const { model, Schema } = require('mongoose')

const productSchema = new Schema({
  product_name: String,
  description: String,
  condition: String,
  images: [String],
  createdAt: String,
  updatedAt: String,
  price: Number,
  status: String,
  user: {
    type: Schema.ObjectId,
    ref: 'users'
  },
  reviews: [
    {
      rating: {type: Number, min:0, max:5},
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

module.exports = model('Product', productSchema)