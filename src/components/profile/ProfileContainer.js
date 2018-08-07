import {connect} from 'react-redux'
import {DELETE_PROFILE, GET_PROFILE_REQUESTED, LOGOUT} from '../../actions/userActions';
import Profile from './Profile';
import {selectUserState} from '../../selectors/userSelector';
import {DELETE_LISTING_REQUESTED, GET_USER_LISTINGS_REQUESTED} from '../../actions/listingActions';
import {selectListingState} from '../../selectors/listingSelector';


function mapStateToProps(state) {
  const {user} = selectUserState(state);
  const {currentListings} = selectListingState(state);
  return {
    user,
    userListings: currentListings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfile: () => dispatch({
      type: GET_PROFILE_REQUESTED
    }),
    logout: () => dispatch({
      type: LOGOUT
    }),
    deleteAccount: () => dispatch({
      type: DELETE_PROFILE
    }),
    getUserListings: user => dispatch({
      type: GET_USER_LISTINGS_REQUESTED,
      user
    }),
    deleteListing: lid => dispatch({
      type: DELETE_LISTING_REQUESTED,
      lid
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
