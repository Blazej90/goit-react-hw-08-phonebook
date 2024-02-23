import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from './redux/contactsSlice';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.pageTitle}>Phonebook</h1>
      <ContactForm />
      <h2 className={styles.contactsHeading}>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;
