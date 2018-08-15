import {connect} from 'react-redux'
import NewWorkRequest from './NewWorkRequest';
import {CREATE_WORK_REQUEST_REQUESTED} from '../../../actions/workRequestActions';
import {selectUserState} from '../../../selectors/userSelector';
import {GET_PROFILE_REQUESTED} from '../../../actions/userActions';


function mapStateToProps(state) {
  const {user} = selectUserState(state);
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createWorkRequest: workRequest => dispatch({
      type: CREATE_WORK_REQUEST_REQUESTED,
      workRequest
    }),
    getProfile: () => dispatch({
      type: GET_PROFILE_REQUESTED
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWorkRequest);
