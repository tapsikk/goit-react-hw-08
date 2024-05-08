import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: { items: [], loading: false, error: null },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchContacts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    })

    .addCase(addContact.fulfilled, (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
    })

    .addCase(deleteContact.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.filter(
        contact => contact.id !== action.payload.id
      )
      });
  },
});

export const contactsReducer = contactsSlice.reducer;