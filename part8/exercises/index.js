/* eslint-disable semi */
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')

require('dotenv').config()

const { MONGODB_URI } = process.env
console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => console.log('error connection to MongoDB:', error.message))

let authors = []
const books = []

const typeDefs = `
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: async (root, args) => Book.find({}),
    // if (!args.author && !args.genre) {
    //   return books
    // }
    // if (args.author && !args.genre) {
    //   return books.filter((book) => book.author === args.author)
    // }
    // if (args.genre && !args.author) {
    //   return books.filter((book) => book.genres.includes(args.genre))
    // }
    // if (args.author && args.genre) {
    //   const author = books.filter((book) => book.author === args.author)
    //   const genre = books.filter((book) => book.genres.includes(args.genre))
    //   const both = author.concat(genre)
    //   return both
    // }

    allAuthors: () => authors,
  },
  Author: {
    name: (root) => root.name,
    bookCount: (root) => Book.findOne({ author: root.name }).length,
    born: (root) => root.born,
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args })
      if (!Author.findOne({ name: args.author })) {
        const author = new Author({ name: args.author })
        await author.save()
      }
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name, error },
        })
      }
      return book
    },
    // addBook: (root, args) => {
    //   if (authors.find((author) => author.name === args.author) === undefined) {
    //     const newAuthor = { name: args.author, born: null, id: uuid() }
    //     authors = authors.concat(newAuthor)
    //   }
    //   const book = { ...args, id: uuid() }
    //   books = books.concat(book)
    //   return book
    // },
    editAuthor: (root, args) => {
      const name = authors.find((author) => author.name === args.name)
      if (!args.name) return null
      if (!name) return null
      const updatedAuthor = { ...name, born: args.setBornTo }
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      )
      return updatedAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
