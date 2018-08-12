import {all, fork, takeLatest, takeEvery, put, call} from 'redux-saga/effects';
import {
  CLEAR_DRAFT, DELETE_MESSAGE_FULFILLED, DELETE_MESSAGE_REQUESTED,
  DRAFT_MESSAGE, GET_MESSAGE_FULFILLED,
  GET_MESSAGE_REQUESTED,
  SEND_MESSAGE_FULFILLED,
  SEND_MESSAGE_REQUESTED
} from '../actions/messageActions';
import {redirect} from '../actions/navigationActions';
import MessageService from '../services/MessageService';
import UserService from '../services/UserService';
import {GET_PROFILE_REQUESTED} from '../actions/userActions';

const messageService = MessageService.instance;
const userService = UserService.instance;

function * draftMessageSaga() {
  yield put(redirect('/profile/message/new'));
}

function * sendMessageSaga({to, message}) {
  console.log('Sending message', to, message);
  const sentMessage = yield call(messageService.sendMessage, message, to);

  if (sentMessage) {
    yield all([
      put({type: SEND_MESSAGE_FULFILLED, message: sentMessage}),
      put({type: CLEAR_DRAFT}),
      put(redirect(`/profile/message/${sentMessage.id}`))
    ]);
  } else {
    console.error('Failed to send message');
  }
}

function * getMessageSaga({mid}) {
  console.log('Getting message:', mid);
  const message = yield call(messageService.getMessage, mid);

  if (message) {
    const [sender, recipient] = yield all([
      call(userService.getUser, message.senderId),
      call(userService.getUser, message.recipientId)
    ]);
    if (sender && recipient) {
      message.sender = sender;
      message.recipient = recipient;
      return yield put({type: GET_MESSAGE_FULFILLED, message});
    }
  }
  console.error('Failed to get message');
}

function * deleteMessageSaga({mid}) {
  console.log('Deleting message:', mid);
  const ok = yield call(messageService.deleteMessage, mid);

  if (ok) {
    yield put({type: DELETE_MESSAGE_FULFILLED, mid});
    yield put({type: GET_PROFILE_REQUESTED});
    yield put(redirect('/profile/message'));
  } else {
    console.error('Failed to delete message');
  }
}

export default function * rootSaga () {
  yield all([
    fork(takeLatest, DRAFT_MESSAGE, draftMessageSaga),
    fork(takeEvery, SEND_MESSAGE_REQUESTED, sendMessageSaga),
    fork(takeLatest, GET_MESSAGE_REQUESTED, getMessageSaga),
    fork(takeEvery, DELETE_MESSAGE_REQUESTED, deleteMessageSaga)
  ]);
}