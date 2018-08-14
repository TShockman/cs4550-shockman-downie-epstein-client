import {connect} from 'react-redux'
import UpdateWorkRequest from './UpdateWorkRequest';
import {
  GET_WORK_REQUEST_REQUESTED, UPDATE_WR_REQUESTED
} from '../../../actions/workRequestActions';
import {selectWorkRequestState} from '../../../selectors/workRequestSelector';

function mapStateToProps(state) {
  const {currentWorkRequest} = selectWorkRequestState(state);
  return {
    currentWorkRequest
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWorkRequest: wrid => dispatch({
      type: GET_WORK_REQUEST_REQUESTED,
      wrid
    }),
    updateWorkRequest: workRequest => dispatch({
      type: UPDATE_WR_REQUESTED,
      workRequest
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateWorkRequest);
