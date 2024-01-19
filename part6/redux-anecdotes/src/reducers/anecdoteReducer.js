import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

export const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE': {
//       const id = action.payload.id
//       const anecToVote = state.find((a) => a.id === id)
//       const newVote = { ...anecToVote, votes: anecToVote.votes + 1 }
//       console.log(id)
//       // return state.map((prev) => [...state, { ...prev, votes: prev.votes + 1 }])
//       return state.map((a) => (a.id !== id ? a : newVote))
//     }
//     case 'NEW_ANECDOTE':
//       return [...state, action.payload]
//     default:
//       return state
//   }
// }

// export const addVote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id },
//   }
// }

// export const addNewAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0,
//     },
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addNewAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0,
      })
    },
    addVote(state, action) {
      const id = action.payload
      const anecToVote = state.find((a) => a.id === id)
      const newVotes = { ...anecToVote, votes: anecToVote.votes + 1 }
      console.log(JSON.parse(JSON.stringify(state)))
      return state.map((a) => (a.id !== id ? a : newVotes))
    },
  },
})

export const { addNewAnecdote, addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
