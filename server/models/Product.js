const { model, Schema } = require('mongoose')

const productSchema = new Schema({
  product_name: String,
  description: String,
  condition: {type:String, enum: ["New", "Used"]},
  pictures: [String],
  createdAt: String,
  price: Number,
  user: {
    type: Schema.ObjectId,
    ref: 'users'
  },
  reviews: [
    {
      rating: {type: Number, min:0, max:5},
      body: String,
      createdAt: String,
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
      ]
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