import { useDispatch, useSelector } from 'react-redux'
import { addVote, handleVote } from '../reducers/anecdoteReducer'
import {
  notify,
  resetNotify,
  setNotification,
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const vote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id)
    // const obj = {
    //   content: anecdote.content,
    //   votes: anecdote.votes + 1,
    // }
    // anecdoteService.update(id, obj).catch((error) => console.error(error))
    // dispatch(addVote(id))
    dispatch(handleVote(anecdote))
    // dispatch(notify('why'))
    // setTimeout(() => {
    //   dispatch(resetNotify(''))
    // }, 5000)
    dispatch(setNotification(`you voted for ${anecdote.content}`, 5000))
  }

  const sorted = anecdotes.toSorted((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sorted
        .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Anecdotes
