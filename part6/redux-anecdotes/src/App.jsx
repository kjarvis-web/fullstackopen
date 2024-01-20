import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then((a) => dispatch(setAnecdotes(a)))
  }, [])
  return (
    <div>
      <Filter />
      <Notification />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App
