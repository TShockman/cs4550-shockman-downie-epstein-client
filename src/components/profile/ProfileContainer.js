import {connect} from 'react-redux'
import {DELETE_PROFILE, GET_PROFILE_REQUESTED, LOGOUT} from '../../actions/userActions';
import Profile from './Profile';
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
    logout: () => dispatch({
      type: LOGOUT
    }),
    deleteAccount: () => dispatch({
      type: DELETE_PROFILE
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
