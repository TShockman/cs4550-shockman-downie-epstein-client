import {connect} from 'react-redux'
import WorkRequest from './WorkRequest';
import {GET_WORK_REQUEST_REQUESTED} from '../../../actions/workRequestActions';
import {selectWorkRequestState} from '../../../selectors/workRequestSelector';


function mapStateToProps(state) {
  const {workRequests, currentWorkRequest} = selectWorkRequestState(state);
  return {
    workRequests,
    currentWorkRequest
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    getWorkRequest: wrid => dispatch({
      type: GET_WORK_REQUEST_REQUESTED,
      wrid
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkRequest);
