import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addNewContact } from '../../redux/contactsSlice';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleAddContact = () => {
    const isContactExists = contacts.some(contact => contact.name === name);
    if (isContactExists) {
      alert('Sorry... but a contact with this name already exists!');
      return;
    }

    dispatch(addNewContact({ id: nanoid(), name, number }));
    setName('');
    setNumber('');
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleAddContact();
    }
  };

  return (
    <div className={styles.appContainer}>
      <h1>Phonebook</h1>
      <p className={styles.name}>Name</p>
      <label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          onKeyDown={handleKeyPress}
        />
      </label>
      <p className={styles.name}>Phone Number</p>
      <label>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleNumberChange}
          onKeyDown={handleKeyPress}
        />
      </label>
      <button className={styles.addContactBtn} onClick={handleAddContact}>
        Add contact
      </button>
    </div>
  );
};

export default ContactForm;
