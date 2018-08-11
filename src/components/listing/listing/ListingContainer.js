import {connect} from 'react-redux'
import Listing from './Listing';
import {selectListingState} from '../../../selectors/listingSelector';
import {
  CREATE_L_COMMENT_REQUESTED,
  DELETE_L_COMMENT_REQUESTED,
  GET_LISTING_REQUESTED
} from '../../../actions/listingActions';
import {selectUserState} from '../../../selectors/userSelector';


function mapStateToProps(state) {
  const {listings, currentListing} = selectListingState(state);
  const {user} = selectUserState(state);
  return {
    user,
    listings,
    currentListing
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    getListing: lid => dispatch({
      type: GET_LISTING_REQUESTED,
      lid
    }),
    createComment: (comment, lid) => dispatch({
      type: CREATE_L_COMMENT_REQUESTED,
      comment,
      lid
    }),
    deleteComment: (cid, lid) => dispatch({
      type: DELETE_L_COMMENT_REQUESTED,
      cid,
      lid
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
