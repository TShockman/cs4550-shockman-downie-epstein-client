import {connect} from 'react-redux'
import WorkRequest from './WorkRequest';
import {
  CREATE_WR_COMMENT_REQUESTED,
  DELETE_WR_COMMENT_REQUESTED,
  GET_WORK_REQUEST_REQUESTED
} from '../../../actions/workRequestActions';
import {selectWorkRequestState} from '../../../selectors/workRequestSelector';
import {selectUserState} from '../../../selectors/userSelector';


function mapStateToProps(state) {
  const {workRequests, currentWorkRequest} = selectWorkRequestState(state);
  const {user} = selectUserState(state);
  return {
    user,
    workRequests,
    currentWorkRequest
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    getWorkRequest: wrid => dispatch({
      type: GET_WORK_REQUEST_REQUESTED,
      wrid
    }),
    createComment: (comment, wrid) => dispatch({
      type: CREATE_WR_COMMENT_REQUESTED,
      comment,
      wrid
    }),
    deleteComment: (cid, wrid) => dispatch({
      type: DELETE_WR_COMMENT_REQUESTED,
      cid,
      wrid
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkRequest);
