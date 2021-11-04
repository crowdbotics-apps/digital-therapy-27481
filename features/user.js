import { createSlice } from "@reduxjs/toolkit"
export const userSlice = createSlice({
  name: "user",
  initialState: { value: { user: {} } },
  reducers: {
    login: (state, action) => {
      state.value = action.payload
    },
    update: (state, action) => {
      state.value.user = action.payload
    }
  }
})

export const { login, update } = userSlice.actions // actions
export default userSlice.reducer
