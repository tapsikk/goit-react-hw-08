import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  deleteContact,
} from "../../../src/redux/contacts/operations";
import { selectFilteredContacts } from "../../../src/redux/contacts/selectors"
import selectFilterName from "../../../src/redux/filters/selectors";
import { changeFilter } from "../../../src/redux/filters/slice"
import ContactForm from "../../../src/components/contactForm/ContactForm";
import ContactList from "../../components/contactList/ContactList";
import SearchBox from "../../components/searchBox/SearchBox";
import { fetchContacts } from '../../redux/contacts/operations';


const ContactsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = useSelector(selectFilteredContacts);
  const filterName = useSelector(selectFilterName);


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

export default ContactsPage;
