import axios from 'axios'

const baseUrl = 'http://localhost:3005/anecdotes'
export const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data)
}

export const createNew = (content) => {
  return axios.post(baseUrl, content).then((res) => res.data)
}
