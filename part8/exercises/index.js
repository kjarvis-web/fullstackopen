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
    author: Author
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
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        const books = await Book.find({}).populate('author')
        console.log('allBooks: ', books)
        return books
      } catch (error) {
        console.error('allBooks error:', error)
      }
    },
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

    allAuthors: async () => Author.find({}),
  },
  Author: {
    name: async (root) => root.name,
    bookCount: async (root) => {
      const bookCount = await Book.find({
        author: root._id,
      }).countDocuments()
      return bookCount
    },
    born: async (root) => root.born || null,
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({ ...args, author })
      console.log(book)
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
