import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredContacts = createSelector(
  state => state.contacts.items,
  state => state.filters.name,
  (contacts, nameFilter) => {
    if (!nameFilter) {
      return contacts;
    }
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }
);
