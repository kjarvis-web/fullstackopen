import { useDispatch, useSelector } from 'react-redux'
import { addVote, handleVote, updateVote } from '../reducers/anecdoteReducer'
import { notify, resetNotify } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const vote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id)
    const obj = {
      content: anecdote.content,
      votes: anecdote.votes + 1,
    }
    // anecdoteService.updateVote(id, obj).catch((error) => console.error(error))
    dispatch(addVote(id))
    dispatch(notify(id))
    dispatch(updateVote(id, obj))
    setTimeout(() => {
      dispatch(resetNotify(''))
    }, 5000)
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
