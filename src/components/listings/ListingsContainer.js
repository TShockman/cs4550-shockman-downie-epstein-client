import {connect} from 'react-redux'
import {selectListingState} from '../../selectors/listingSelector';
import {QUERY_LISTING_REQUESTED} from '../../actions/listingActions';
import Listings from './Listings';


function mapStateToProps(state) {
  const {listingsSearchResult} = selectListingState(state);
  return {
    listings: listingsSearchResult
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchListings: query => dispatch({
      type: QUERY_LISTING_REQUESTED,
      query
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
