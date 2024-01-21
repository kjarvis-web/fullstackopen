import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state, action) {
      console.log('notify')
      return action.payload
    },
    resetNotify(state, action) {
      return (state = '')
    },
    // setNotification(state, action) {
    //   const { message, time } = action.payload

    //   console.log(message)
    //   console.log(time)

    //   state.push(message)
    //   console.log(state)
    //   setTimeout(() => {
    //     state.splice(0, 1)
    //   }, time)
    // },
  },
})
export const { notify, resetNotify } = notificationSlice.actions
export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(resetNotify())
    }, time)
  }
}
export default notificationSlice.reducer
