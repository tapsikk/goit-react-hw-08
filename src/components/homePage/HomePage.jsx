import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  deleteContact,
} from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors"
import { selectFilterName } from "../../redux/filters/selectors";
import { changeFilter } from "../../redux/filters/slice"
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
          searchContact={filteredContacts}
          deleteContacts={deleteContacts}
        />
      ) : filterName.trim() !== "" ? (
        <p style={{ textAlign: "center" }}>Not found!</p>
      ) : null}
    </>
  );
}

export default HomePage;
