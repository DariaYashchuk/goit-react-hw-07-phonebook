import { useState } from 'react';
import { nanoid } from 'nanoid';

import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/contactsSlice';
import { contactsSelector } from 'redux/contacts/contactsSelector';

const ContactForm = () => {
  const contacts = useSelector(contactsSelector);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        console.log('cannot find');
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const onSubmitClick = e => {
    e.preventDefault();

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isNameIncluded = contacts.some(
      value => value.name.toLowerCase() === contact.name.toLowerCase()
    );
    isNameIncluded
      ? alert(`${name} is already in contacts`)
      : dispatch(addContact(contact));

    reset();
  };

  return (
    <form onSubmit={onSubmitClick}>
      <label htmlFor={nameInputId}>
        Name
        <input
          id={nameInputId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor={numberInputId}>
        Number
        <input
          id={numberInputId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
