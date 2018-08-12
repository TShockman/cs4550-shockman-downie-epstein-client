import {all, fork, takeLatest, takeEvery, put, call} from 'redux-saga/effects';
import {
  CLEAR_DRAFT,
  DRAFT_MESSAGE, GET_MESSAGE_FULFILLED,
  GET_MESSAGE_REQUESTED,
  SEND_MESSAGE_FULFILLED,
  SEND_MESSAGE_REQUESTED
} from '../actions/messageActions';
import {redirect} from '../actions/navigationActions';
import MessageService from '../services/MessageService';
import UserService from '../services/UserService';

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

export default function * rootSaga () {
  yield all([
    fork(takeLatest, DRAFT_MESSAGE, draftMessageSaga),
    fork(takeEvery, SEND_MESSAGE_REQUESTED, sendMessageSaga),
    fork(takeLatest, GET_MESSAGE_REQUESTED, getMessageSaga)
  ]);
}