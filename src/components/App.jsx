import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import { useSelector } from 'react-redux';
import { getError, getIsLoading } from 'redux/contacts/contactsSelector';

// import { useEffect } from 'react';
// import { fetchContacts } from 'redux/operations';

export const App = () => {
  // const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  // useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>

      <Filter />
      {/* {error && <p>{error}</p>} */}
      {isLoading && !error && <b>Request in progress...</b>}
      {/* {items.length > 0 && <ContactList />} */}
      <ContactList />
    </div>
  );
};
