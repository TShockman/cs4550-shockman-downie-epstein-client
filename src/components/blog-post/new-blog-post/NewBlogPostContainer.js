import {connect} from 'react-redux'
import NewBlogPost from './NewBlogPost';
import {selectUserState} from '../../../selectors/userSelector';
import {CREATE_BLOG_POST_REQUESTED} from '../../../actions/blogPostActions';


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
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBlogPost);
