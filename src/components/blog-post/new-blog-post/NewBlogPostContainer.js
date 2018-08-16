import {connect} from 'react-redux'
import NewBlogPost from './NewBlogPost';
import {selectUserState} from '../../../selectors/userSelector';
import {CREATE_BLOG_POST_REQUESTED} from '../../../actions/blogPostActions';
import {GET_PROFILE_REQUESTED} from '../../../actions/userActions';


function mapStateToProps(state) {
  const {user} = selectUserState(state);
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createBlogPost: blogPost => dispatch({
      type: CREATE_BLOG_POST_REQUESTED,
      blogPost
    }),
    getProfile: () => dispatch({
      type: GET_PROFILE_REQUESTED
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBlogPost);
