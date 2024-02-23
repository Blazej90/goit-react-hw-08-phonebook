import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addNewContact } from '../redux/contactsSlice';
import styles from '../App.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleAddContact = () => {
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
