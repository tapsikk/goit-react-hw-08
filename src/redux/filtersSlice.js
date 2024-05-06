import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const selectFilterName = (state) => state.filters.name;

export const { changeFilter } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
