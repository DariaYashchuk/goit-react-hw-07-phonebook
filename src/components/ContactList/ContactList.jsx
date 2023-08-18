import React, { useEffect } from 'react';
import { AiOutlineUserDelete } from 'react-icons/ai';
import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import { getContacts } from 'redux/contacts/contactsSelector';
import { filterSelector } from 'redux/filter/filterSelector';

const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contacts = useSelector(getContacts);
  const filter = useSelector(filterSelector);
  const handleDeleteContact = id => dispatch(deleteContact(id));

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    console.log(contacts);
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <ul>
      {visibleContacts.map(({ id, name, phone }) => (
        <li key={id}>
          <p>
            <AiOutlineUserDelete className={css.icon} />
            {name}: {phone}
          </p>
          <button
            className={css.button}
            onClick={() => handleDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
