import {connect} from 'react-redux'
import BlogPost from './BlogPost';
import {
  CREATE_BP_COMMENT_REQUESTED,
  DELETE_BP_COMMENT_REQUESTED,
  GET_BLOG_POST_REQUESTED
} from '../../../actions/blogPostActions';
import {selectBlogPostState} from '../../../selectors/blogPostSelector';
import {selectUserState} from '../../../selectors/userSelector';


function mapStateToProps(state) {
  const {blogPosts, currentBlogPost} = selectBlogPostState(state);
  const {user} = selectUserState(state);
  return {
    user,
    blogPosts,
    currentBlogPost
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    getBlogPost: bpid => dispatch({
      type: GET_BLOG_POST_REQUESTED,
      bpid
    }),
    createComment: (comment, bpid) => dispatch({
      type: CREATE_BP_COMMENT_REQUESTED,
      comment,
      bpid
    }),
    deleteComment: cid => dispatch({
      type: DELETE_BP_COMMENT_REQUESTED,
      cid
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);
