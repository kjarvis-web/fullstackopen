import { createSlice } from '@reduxjs/toolkit'

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SEARCH':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const getInput = (input) => {
//   return {
//     type: 'SEARCH',
//     payload: input,
//   }
// }
const initialState = ''
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    getInput(state, action) {
      return action.payload
    },
  },
})
export const { getInput } = filterSlice.actions
export default filterSlice.reducer
