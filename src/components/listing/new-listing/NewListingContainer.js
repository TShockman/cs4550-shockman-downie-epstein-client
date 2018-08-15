import {connect} from 'react-redux'
import NewListing from './NewListing';
import {CREATE_LISTING_REQUESTED, GET_LISTING_REQUESTED} from '../../../actions/listingActions';
import {selectUserState} from '../../../selectors/userSelector';
import {GET_PROFILE_REQUESTED} from '../../../actions/userActions';


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
    }),
    getProfile: () => dispatch({
      type: GET_PROFILE_REQUESTED
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewListing);
