import {Record} from 'immutable';
import {DELETE_PROFILE, GET_PROFILE_FULFILLED, LOGIN_USER_FULFILLED, LOGOUT} from '../actions/userActions';
import {DELETE_LISTING_FULFILLED} from '../actions/listingActions';
import {CLEAR_DRAFT, DELETE_MESSAGE_FULFILLED, DRAFT_MESSAGE, GET_MESSAGE_FULFILLED} from '../actions/messageActions';

const MessageState = Record({
  messageDraft: {
    to: '',
    subject: '',
    body: ''
  },
  message: null
});

const initialState = new MessageState();

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_DRAFT: {
      return state.set('messageDraft', {to: '', subject: '', body: ''});
    }
    case DRAFT_MESSAGE: {
      const {to = ''} = action;
      const {subject = '', body = ''} = action.message;
      return state.set('messageDraft', {to, subject, body});
    }
    case GET_MESSAGE_FULFILLED: {
      return state.set('message', action.message);
    }
    case DELETE_MESSAGE_FULFILLED: {
      if (state.message.id === action.mid) {
        return state.set('message', null);
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
