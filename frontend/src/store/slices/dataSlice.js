import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    isItemSelected: false,
    ItemSelected: {},
    page: 1,
    selectedType: "work",
  },
  reducers: {
    // set the data
    setData: (state, action) => {
      state.data = action.payload;
    },
    // set the selected item
    setSelectedItem: (state, action) => {
      state.ItemSelected = action.payload;
      state.isItemSelected = !state.isItemSelected;
    },
    // set the page
    setPage: (state, action) => {
      state.page = action.payload;
    },
    // set the selected type
    selectedType: (state, action) => {
      state.selectedType = action.payload;
      state.page = 1;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice.reducer;
