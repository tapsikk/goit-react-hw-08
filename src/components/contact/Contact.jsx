import { useDispatch } from 'react-redux';
import style from "./contactStyle.module.scss";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { deleteContact } from '../../redux/contactsOps'; 

const Contact = ({ searchContact }) => {
  const { id, name, number } = searchContact;
  const dispatch = useDispatch(); 

  const handleClickDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li>
      <div>
        <p className={style.nameLi}>
          <FaUser className={style.userIcon}/>    
          {name}
        </p>
        <p>
          <a className={style.tel} href={`tel:${number}`}>
            <FaPhoneAlt/>
            {number}
          </a>
        </p>
        <button 
          type="button"
          onClick={handleClickDelete} 
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Contact;
