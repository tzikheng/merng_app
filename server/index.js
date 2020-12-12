const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')

const { MONGODB } = require('./config.js')
const typeDefs = require('./graphql/typeDefs.js')
const resolvers = require('./graphql/resolvers') // import from index.js so no need to specify

const PORT = process.env.PORT || 5000

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context: ({req}) => ({ req })
})

mongoose
  .connect(MONGODB, { useNewUrlParser:true, useUnifiedTopology:true }) // returns a promise
    .then(()=>{
      console.log('MongoDB Connected')
      return server.listen({port:PORT})
    })  
    .then((res)=>{
      console.log(`Server running at ${res.url}`)
    })
    .catch(error => {
      console.log(error)
    })
