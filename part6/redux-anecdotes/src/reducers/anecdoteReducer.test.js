import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  test('returns new state with action anecdotes/addNewAnecdote', () => {
    const state = []
    const action = {
      type: 'anecdotes/addNewAnecdote',
      payload: 'the app state is in redux store',
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toHaveLength(1)
    expect(newState.map((s) => s.content)).toContainEqual(action.payload)
  })

  test('returns new state with action anecdotes/addVote', () => {
    const state = [
      { id: 1, content: 'the app state is in redux store', votes: 0 },
      { id: 2, content: 'state changes are made with actions', votes: 0 },
    ]
    const action = {
      type: 'anecdotes/addVote',
      payload: state[0].id,
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toHaveLength(2)
    // expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      id: 1,
      content: 'the app state is in redux store',
      votes: 1,
    })
  })
})
