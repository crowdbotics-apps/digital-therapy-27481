import { createSlice } from "@reduxjs/toolkit"
export const newConvesationSlice = createSlice({
  name: "newConversation",
  initialState: { value: { categories: [], persons: [], topic: [] } },
  reducers: {
    actionCategories: (state, action) => {
      state.value.categories = action.payload
    },
    actionPersons: (state, action) => {
      state.value.persons = action.payload
    },
    actionTopic: (state, action) => {
      state.value.catopictegories = action.payload
    }
  }
})

export const {
  actionCategories,
  actionPersons,
  actionTopic
} = newConvesationSlice.actions // actions
export default newConvesationSlice.reducer
