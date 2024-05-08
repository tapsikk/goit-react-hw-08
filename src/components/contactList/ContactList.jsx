import { selectFilteredContacts } from '../../redux/contacts/selectors';
import { deleteContact } from '../../redux/contacts/operations'
import style from "./ContactList.module.css";
import Contact from "../contact/Contact";
import { useSelector, useDispatch } from 'react-redux';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className={style.ulContact}>
      {filteredContacts.map(item => (
        <Contact
          key={item.id}
          searchContact={item}
          handleClickDelete={() => handleDeleteContact(item.id)}
        />
      ))}
    </ul>
  );
};

export default ContactList;