import {connect} from 'react-redux'
import Messages from './Messages';
import {selectUserState} from '../../../selectors/userSelector';
import {DRAFT_MESSAGE} from '../../../actions/messageActions';
import {GET_PROFILE_REQUESTED} from '../../../actions/userActions';


function mapStateToProps(state) {
  const {user} = selectUserState(state);
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    draftMessage: () => dispatch({
      type: DRAFT_MESSAGE,
      to: '',
      message: {
        subject: '',
        body: ''
      }
    }),
    getProfile: () => dispatch({
      type: GET_PROFILE_REQUESTED
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
