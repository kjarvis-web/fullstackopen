import { createSlice } from '@reduxjs/toolkit'

let initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      return action.payload
    },
    resetNotify(state, action) {
      return action.payload
    },
  },
})
export const { notify, resetNotify } = notificationSlice.actions
export default notificationSlice.reducer
