import {connect} from 'react-redux'
import {REGISTER_USER_REQUESTED} from '../../actions/userActions';
import Homepage from './Homepage';
import {selectUserState} from '../../selectors/userSelector';
import {selectListingState} from '../../selectors/listingSelector';
import {GET_ALL_LISTINGS_REQUESTED} from '../../actions/listingActions';
import {selectWorkRequestState} from '../../selectors/workRequestSelector';
import {GET_ALL_WORK_REQUESTS_REQUESTED} from '../../actions/workRequestActions';


function mapStateToProps(state) {
  const listingState = selectListingState(state);
  const listings = Object.keys(listingState.listings).map(key => listingState.listings[key]);
  const workRequestState = selectWorkRequestState(state);
  const workRequests = Object.keys(workRequestState.workRequests).map(key => workRequestState.workRequests[key]);
  return {
    listings,
    workRequests,
    blogPosts: []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getListings: () => dispatch({
      type: GET_ALL_LISTINGS_REQUESTED
    }),
    getWorkRequests: () => dispatch({
      type: GET_ALL_WORK_REQUESTS_REQUESTED
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);