import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { createNew, getAll } from './requests'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
  })
  const anecdotes = result.data

  if (result.isPending) {
    return <div>loading...</div>
  }

  if (result.error) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
