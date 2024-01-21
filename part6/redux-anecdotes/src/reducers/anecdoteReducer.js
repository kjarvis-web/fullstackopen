import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

// export const initialState = anecdotesAtStart.map(asObject)

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
  initialState: [],
  reducers: {
    addNewAnecdote(state, action) {
      console.log('addnewanec')
      state.push(action.payload)
    },
    addVote(state, action) {
      const anecdote = action.payload
      // const id = action.payload
      // const anecToVote = state.find((a) => a.id === id)

      // console.log(JSON.parse(JSON.stringify(state)))
      return state.map((a) => (a.id !== anecdote.id ? a : anecdote))
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { addNewAnecdote, addVote, setAnecdotes, updateVote } =
  anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addNewAnecdote(newAnecdote))
  }
}
export const handleVote = (anecdote) => {
  return async (dispatch) => {
    const updatedVote = await anecdoteService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch(addVote(updatedVote))
  }
}
export default anecdoteSlice.reducer
