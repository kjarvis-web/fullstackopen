import { useDispatch } from 'react-redux'
import { getInput } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (input) => {
    dispatch(getInput(input))
  }
  return (
    <div>
      filter:{' '}
      <input type="text" onChange={(e) => handleChange(e.target.value)}></input>
    </div>
  )
}

export default Filter
