import {Record} from 'immutable';
import {DELETE_PROFILE, GET_PROFILE_FULFILLED, LOGIN_USER_FULFILLED, LOGOUT} from '../actions/userActions';
import {DELETE_LISTING_FULFILLED} from '../actions/listingActions';
import {CLEAR_DRAFT, DRAFT_MESSAGE} from '../actions/messageActions';

const MessageState = Record({
  messageDraft: {
    to: '',
    subject: '',
    body: ''
  }
});

const initialState = new MessageState();

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_DRAFT: {
      return state.set('messageDraft', {to: '', subject: '', body: ''});
    }
    case DRAFT_MESSAGE: {
      const {to = '', subject = '', body = ''} = action;
      return state.set('messageDraft', {to, subject, body});
    }
    default: {
      return state;
    }
  }
}
