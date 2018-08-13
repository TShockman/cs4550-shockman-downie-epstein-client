import {connect} from 'react-redux'
import {GET_ALL_WORK_REQUESTS_REQUESTED} from '../../../actions/workRequestActions';
import {selectWorkRequestState} from '../../../selectors/workRequestSelector';
import ListWorkRequests from './ListWorkRequests';

function mapStateToProps(state) {
  const {workRequests} = selectWorkRequestState(state);
  return {
    workRequests
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWorkRequests: () => dispatch({
      type: GET_ALL_WORK_REQUESTS_REQUESTED
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListWorkRequests);