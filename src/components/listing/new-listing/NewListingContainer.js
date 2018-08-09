import {connect} from 'react-redux'
import NewListing from './NewListing';
import {CREATE_LISTING_REQUESTED, GET_LISTING_REQUESTED} from '../../../actions/listingActions';
import {selectUserState} from '../../../selectors/userSelector';


function mapStateToProps(state) {
  const {user} = selectUserState(state);
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createListing: listing => dispatch({
      type: CREATE_LISTING_REQUESTED,
      listing
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewListing);
