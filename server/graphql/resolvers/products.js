const { AuthenticationError, UserInputError } = require('apollo-server')

const Product = require('../../models/Product.js')
const checkAuth = require('../../utility/check-auth.js')

module.exports = {
  Query:{
    async products(){
      try{
        const products = await Product.find().sort({ createdAt: -1 })
        return products
      } catch(err){
        throw new Error(err)
      }
    },

    async getProduct(_, { productId }){
      try{
        const product = await Product.findById(productId)
        if(product){
          return product;
        } else {
          throw new Error('Product not found')
        }
      } catch(err){
        throw new Error(err)
      }
    }
  },

  Mutation:{
    async createProduct(_, { product_name, description, condition, price}, context){
      const user = checkAuth(context)
      const newProduct = new Product({
        user: user.id,
        product_name,
        description,
        condition,
        price,
        pictures: ['https://react.semantic-ui.com/images/wireframe/white-image.png'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      const product = await newProduct.save()
      return product
    },

    async likeProduct(_, { productId }, context) {
      const user = checkAuth(context);
      const product = await Product.findById(productId);
      if (product) {
        if (product.likes.find((like) => like.user.toString() === user.id)) {
          product.likes = product.likes.filter((like) => like.user.toString() !== user.id);
        } else {
          product.likes.push({
            createdAt: new Date().toISOString(),
            user: user.id
          });
        }
        await product.save();
        return product;
      } else throw new UserInputError('Product not found');
    },
    
    async deleteProduct(_, { productId }, context){
      const user = checkAuth(context)
      try{
        const product = await Product.findById(productId)
        if(product.user.toString()===user.id){
          await product.delete()
          return 'Product deleted successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch(err) {
        throw new Error(err)
      }
    },

    async deleteAllProducts(){
      try{
        await Product.deleteMany({})
        return 'Products deleted'
      } catch(err) {
        throw new Error(err)
      }
    }
  }
}