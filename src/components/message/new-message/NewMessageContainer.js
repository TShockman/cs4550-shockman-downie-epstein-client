import {connect} from 'react-redux'
import NewMessage from './NewMessage';
import {selectMessageState} from '../../../selectors/messageSelector';
import {SEND_MESSAGE_REQUESTED} from '../../../actions/messageActions';


function mapStateToProps(state) {
  const {messageDraft} = selectMessageState(state);
  return {
    messageDraft
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendMessage: (to, message) => dispatch({
      type: SEND_MESSAGE_REQUESTED,
      to,
      message
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
