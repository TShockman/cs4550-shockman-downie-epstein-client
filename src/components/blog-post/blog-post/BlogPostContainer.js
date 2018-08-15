import {connect} from 'react-redux'
import BlogPost from './BlogPost';
import {
  CREATE_BP_COMMENT_REQUESTED, DELETE_BLOG_POST_REQUESTED,
  DELETE_BP_COMMENT_REQUESTED,
  GET_BLOG_POST_REQUESTED
} from '../../../actions/blogPostActions';
import {selectBlogPostState} from '../../../selectors/blogPostSelector';
import {selectUserState} from '../../../selectors/userSelector';
import {DRAFT_MESSAGE} from '../../../actions/messageActions';
import {GET_PROFILE_REQUESTED} from '../../../actions/userActions';


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
    deleteComment: (cid, bpid) => dispatch({
      type: DELETE_BP_COMMENT_REQUESTED,
      cid,
      bpid
    }),
    draftMessage: (to, message) => dispatch({
      type: DRAFT_MESSAGE,
      to,
      message
    }),
    getProfile: () => dispatch({
      type: GET_PROFILE_REQUESTED
    }),
    deleteBlogPost: bpid => dispatch({
      type: DELETE_BLOG_POST_REQUESTED,
      bpid
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);
