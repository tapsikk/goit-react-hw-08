import { selectFilteredContacts } from '../../redux/contacts/selectors';
import style from "./ContactList.module.css";
import Contact from "../contact/Contact";
import { useSelector } from 'react-redux';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={style.ulContact}>
      {filteredContacts.map(item => (
        <Contact
          key={item.id}
          searchContact={item}
        />
      ))}
    </ul>
  );
};

export default ContactList;