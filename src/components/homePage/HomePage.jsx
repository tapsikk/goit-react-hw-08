import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  deleteContact,
} from "../../redux/contactsOps";
import { selectFilteredContacts } from "../../redux/contactsSlice"
import { selectFilterName, changeFilter } from "../../redux/filtersSlice";
import ContactForm from "../contactForm/ContactForm";
import ContactList from "../contactList/ContactList";
import SearchBox from "../searchBox/SearchBox";

function HomePage() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const filterName = useSelector(selectFilterName);
  const dispatch = useDispatch();

  const addContacts = (newContact) => {
    dispatch(addContact(newContact));
  };

  const deleteContacts = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  useEffect(() => {
    window.localStorage.setItem("saved-contacts", JSON.stringify(filteredContacts));
  }, [filteredContacts]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContacts={addContacts} />
      <SearchBox value={filterName} onFilter={(value) => dispatch(changeFilter(value))} />
      {filteredContacts.length !== 0 ? (
        <ContactList
          searchContact={filteredContacts} // Передаем filteredContacts вместо searchContact
          deleteContacts={deleteContacts}
        />
      ) : filterName.trim() !== "" ? (
        <p style={{ textAlign: "center" }}>Not found!</p>
      ) : null}
    </>
  );
}

export default HomePage;
