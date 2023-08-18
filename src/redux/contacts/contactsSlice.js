import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from 'redux/operations';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.rejected]: handleRejected,

    // ====== fetchContacts ====

    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },

    // ====== Contact ====

    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = [action.payload, ...state.items];
    },

    // ====== deleteContact ====

    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

// addContact({ items }, action) {
//   console.log(items);
//   items.push({ ...action.payload });
// },
// deleteContact({ items }, action) {
//   console.log(items);
//   return items.filter(item => item.id !== action.payload);
// },

// export const { fetchingInProgress, fetchingSuccess, fetchingError } =
//   contactsSlice.actions;

export default contactsSlice.reducer;
