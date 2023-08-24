import React from 'react';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/contacts/contactsSelector';
import { filterSelector } from 'redux/filter/filterSelector';
import Filter from 'components/Filter';

import { ContactListItem } from './ContactListItem';

const ContactList = () => {
  const contacts = useSelector(getContacts);

  const filter = useSelector(filterSelector);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={css.contentwrapper}>
      <h1 className="title">Contacts</h1>
      <div className={css.contactswrapper}>
        <Filter />
        <ul className={css.contactslist}>
          {visibleContacts.map(({ id, name, phone }) => (
            <ContactListItem key={id} name={name} phone={phone} id={id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactList;
