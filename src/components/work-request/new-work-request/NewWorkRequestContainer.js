import {connect} from 'react-redux'
import NewWorkRequest from './NewWorkRequest';
import {CREATE_WORK_REQUEST_REQUESTED} from '../../../actions/workRequestActions';
import {selectUserState} from '../../../selectors/userSelector';


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
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWorkRequest);
