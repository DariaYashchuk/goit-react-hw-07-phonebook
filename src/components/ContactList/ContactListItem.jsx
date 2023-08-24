import css from './ContactList.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { BiTrash } from 'react-icons/bi';

import { RotatingLines } from 'react-loader-spinner';
import { getError, getIsLoading } from 'redux/contacts/contactsSelector';
import { AiOutlineUserDelete } from 'react-icons/ai';

export const ContactListItem = ({ name, phone, id }) => {
  const dispatch = useDispatch();
  const handleDeleteContact = id => dispatch(deleteContact(id));

  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const deleteButtonContent =
    isLoading && !error ? (
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        visible={true}
        width="16px"
        height="16px"
      />
    ) : (
      <BiTrash className={css.deleteicon} />
    );

  return (
    <li className={css.contactitem}>
      <p className={css.contactinfo}>
        <AiOutlineUserDelete className={css.usericon} />
        {name}: {phone}
      </p>
      <button
        className={clsx('button-common button-main', css.deletebutton)}
        onClick={() => handleDeleteContact(id)}
      >
        {isLoading && !error ? (
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            visible={true}
            width="16px"
            height="16px"
          />
        ) : (
          <BiTrash className={css.deleteicon} />
        )}
      </button>
    </li>
  );
};
