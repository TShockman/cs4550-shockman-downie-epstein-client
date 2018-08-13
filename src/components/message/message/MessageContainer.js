import {connect} from 'react-redux'
import Message from './Message';
import {DELETE_MESSAGE_REQUESTED, DRAFT_MESSAGE, GET_MESSAGE_REQUESTED} from '../../../actions/messageActions';
import {selectMessageState} from '../../../selectors/messageSelector';


function mapStateToProps(state) {
  const {message} = selectMessageState(state);
  return {
    message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    draftMessage: (to, message) => dispatch({
      type: DRAFT_MESSAGE,
      to,
      message
    }),
    getMessage: mid => dispatch({
      type: GET_MESSAGE_REQUESTED,
      mid
    }),
    deleteMessage: mid => dispatch({
      type: DELETE_MESSAGE_REQUESTED,
      mid
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
