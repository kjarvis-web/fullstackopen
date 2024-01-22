import axios from 'axios'

export const getAll = () => {
  return axios.get('http://localhost:3005/anecdotes').then((res) => res.data)
}
