import {connect} from 'react-redux'
import UpdateListing from './UpdateListing';
import {selectListingState} from '../../../selectors/listingSelector';
import {GET_LISTING_REQUESTED, UPDATE_L_REQUESTED} from '../../../actions/listingActions';

function mapStateToProps(state) {
  const {currentListing} = selectListingState(state);
  return {
    currentListing
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getListing: lid => dispatch({
      type: GET_LISTING_REQUESTED,
      lid
    }),
    updateListing: listing => dispatch({
      type: UPDATE_L_REQUESTED,
      listing
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateListing);
