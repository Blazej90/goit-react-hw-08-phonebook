import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { fetchContacts } from '../redux/contactsSlice';
import { selectLoading, selectError } from '../redux/auth/selectors';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

const Phonebook = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Phonebook</title>
        </Helmet>
      </HelmetProvider>
      <div>
        <ContactForm />
        <ContactList isLoading={isLoading} isError={isError} />
      </div>
    </div>
  );
};

export default Phonebook;
