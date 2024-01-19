import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.anecdotes.slice(-1))
  console.log(notification[0].content)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <div style={style}>{notification[0].content}</div>
}

export default Notification
