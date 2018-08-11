import {all, fork, takeLatest, takeEvery, put, call} from 'redux-saga/effects';
import {CLEAR_DRAFT, DRAFT_MESSAGE, SEND_MESSAGE_FULFILLED, SEND_MESSAGE_REQUESTED} from '../actions/messageActions';
import {redirect} from '../actions/navigationActions';
import MessageService from '../services/MessageService';

const messageService = MessageService.instance;

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

export default function * rootSaga () {
  yield all([
    fork(takeLatest, DRAFT_MESSAGE, draftMessageSaga),
    fork(takeEvery, SEND_MESSAGE_REQUESTED, sendMessageSaga)
  ]);
}