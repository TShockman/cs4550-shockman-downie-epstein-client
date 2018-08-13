import {connect} from 'react-redux'
import SearchWorkRequests from './SearchWorkRequests';
import {QUERY_WORK_REQUEST_REQUESTED} from '../../../actions/workRequestActions';
import {selectWorkRequestState} from '../../../selectors/workRequestSelector';


function mapStateToProps(state) {
  const {workRequestsSearchResult} = selectWorkRequestState(state);
  return {
    workRequests: workRequestsSearchResult
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchWorkRequests: query => dispatch({
      type: QUERY_WORK_REQUEST_REQUESTED,
      query
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWorkRequests);
