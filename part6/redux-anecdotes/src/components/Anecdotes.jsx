import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notify, resetNotify } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(addVote(id))
    dispatch(notify(id))
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
