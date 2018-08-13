import {connect} from 'react-redux'
import ListListings from './ListListings';
import {GET_ALL_LISTINGS_REQUESTED} from '../../../actions/listingActions';
import {selectListingState} from '../../../selectors/listingSelector';

function mapStateToProps(state) {
  const {listings} = selectListingState(state);
  return {
    listings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getListings: () => dispatch({
      type: GET_ALL_LISTINGS_REQUESTED
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListListings);