import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
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
