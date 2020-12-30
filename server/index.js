const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./graphql/typeDefs.js')
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js')

const main = async() => {
  const PORT = process.env.PORT || 5000
  const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({req}) => ({ req })
  })
  server.listen({port:PORT}).then((res) => {
    console.log(`🚀  Server ready at ${res.url}`);
  });

  mongoose
    .connect(MONGODB, { useNewUrlParser:true, useUnifiedTopology:true })
      .then(()=>{
        console.log('MongoDB Connected')
      })
      .catch(error => {
        console.log(error)
      })
}

main().catch(err => {
  console.log(err)
})