import {connect} from 'react-redux'
import {REGISTER_USER_REQUESTED} from '../../actions/userActions';
import Homepage from './Homepage';
import {selectUserState} from '../../selectors/userSelector';
import {selectListingState} from '../../selectors/listingSelector';
import {GET_ALL_LISTINGS_REQUESTED} from '../../actions/listingActions';


function mapStateToProps(state) {
  const listingState = selectListingState(state);
  const listings = Object.keys(listingState.listings).map(key => listingState.listings[key]);
  return {
    listings,
    workRequests: [],
    blogPosts: []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getListings: () => dispatch({
      type: GET_ALL_LISTINGS_REQUESTED
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);