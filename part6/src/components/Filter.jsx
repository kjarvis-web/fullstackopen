import { useDispatch } from 'react-redux'
import { search } from '../reducers/noteReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (input) => {
    dispatch(search(input))
  }
  return (
    <div>
      filter
      <input type="text" onChange={(e) => handleChange(e.target.value)}></input>
    </div>
  )
}

export default Filter
