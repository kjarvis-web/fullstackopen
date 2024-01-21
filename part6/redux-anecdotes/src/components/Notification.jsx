import { useSelector } from 'react-redux'

const Notification = () => {
  const id = useSelector((state) => state.notification)
  const findAnec = useSelector((state) =>
    state.anecdotes.find((c) => c.id === id)
  )
  console.log(findAnec)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return id.length !== 0 ? <div style={style}>you voted for '{id}'</div> : null
}

export default Notification
