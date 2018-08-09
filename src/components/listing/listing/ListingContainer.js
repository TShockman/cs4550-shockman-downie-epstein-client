import {connect} from 'react-redux'
import Listing from './Listing';
import {selectListingState} from '../../../selectors/listingSelector';
import {GET_LISTING_REQUESTED} from '../../../actions/listingActions';


function mapStateToProps(state) {
  const {listings, currentListing} = selectListingState(state);
  return {
    listings,
    currentListing
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    getListing: lid => dispatch({
      type: GET_LISTING_REQUESTED,
      lid
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
