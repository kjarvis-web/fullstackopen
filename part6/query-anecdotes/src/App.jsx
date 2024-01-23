import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { createNew, getAll, update } from './requests'
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import NotificationContext from './context/NotificationContext'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const handleVote = (anecdote) => {
    console.log('vote', notification)
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })

    dispatch({ type: 'VOTE', payload: anecdote.content })

    setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, 2000)
  }
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
  })
  const anecdotes = result.data

  const queryClient = useQueryClient()
  const voteMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
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
