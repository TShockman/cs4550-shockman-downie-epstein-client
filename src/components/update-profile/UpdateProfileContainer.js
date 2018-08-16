import {connect} from 'react-redux'
import {GET_PROFILE_REQUESTED, UPDATE_PROFILE_REQUESTED} from '../../actions/userActions';
import UpdateProfile from './UpdateProfile';
import {selectUserState} from '../../selectors/userSelector';


function mapStateToProps(state) {
  const {user} = selectUserState(state);
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfile: () => dispatch({
      type: GET_PROFILE_REQUESTED
    }),
    updateProfile: user => dispatch({
      type: UPDATE_PROFILE_REQUESTED,
      user
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
