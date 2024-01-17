import React from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <Filter />
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}
export default App
