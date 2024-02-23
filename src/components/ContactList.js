import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contactsSlice';
import styles from '../App.module.css';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(
    contact =>
      contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={styles.contactList}>
      {filteredContacts.map(contact => (
        <li key={contact.id} className={styles.contactItem}>
          {contact.name} - {contact.number}
          <button
            onClick={() => handleDeleteContact(contact.id)}
            className={styles.deleteBtn}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
