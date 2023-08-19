import React from 'react';
import { AiOutlineUserDelete } from 'react-icons/ai';
import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import {
  getContacts,
  getError,
  getIsLoading,
} from 'redux/contacts/contactsSelector';
import { filterSelector } from 'redux/filter/filterSelector';
import Filter from 'components/Filter';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const filter = useSelector(filterSelector);
  const handleDeleteContact = id => dispatch(deleteContact(id));

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div>
      <h1>Contacts</h1>
      <Filter />
      {isLoading && !error && <b>Request in progress...</b>}
      <ul>
        {visibleContacts.map(({ id, name, phone }) => (
          <li key={id}>
            <p>
              <AiOutlineUserDelete className={css.icon} />
              {name}: {phone}
            </p>
            <button
              className="button-common button-main"
              onClick={() => handleDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
