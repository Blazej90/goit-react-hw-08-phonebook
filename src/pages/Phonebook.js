import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  fetchContacts,
  addNewContact,
  deleteContact,
} from '../redux/contactsSlice';
import { selectLoading, selectError } from '../redux/auth/selectors';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList';
import Filter from '../components/Filter';

const Phonebook = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddNewContact = contact => {
    dispatch(addNewContact(contact));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Phonebook</title>
        </Helmet>
      </HelmetProvider>
      <div>
        <ContactForm onAddNewContact={handleAddNewContact} />
        <Filter />
        <ContactList
          isLoading={isLoading}
          isError={isError}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
};

export default Phonebook;
