import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (content) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const [notification, dispatch] = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      dispatch({ type: 'NEW_ANECDOTE', payload: content })
    } else {
      console.log('enter five characters or more')
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
