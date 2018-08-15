import {connect} from 'react-redux'
import UpdateBlogPost from './UpdateBlogPost';
import {selectBlogPostState} from '../../../selectors/blogPostSelector';
import {GET_BLOG_POST_REQUESTED, UPDATE_BP_REQUESTED} from '../../../actions/blogPostActions';

function mapStateToProps(state) {
  const {currentBlogPost} = selectBlogPostState(state);
  return {
    currentBlogPost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBlogPost: bpid => dispatch({
      type: GET_BLOG_POST_REQUESTED,
      bpid
    }),
    updateBlogPost: blogPost => dispatch({
      type: UPDATE_BP_REQUESTED,
      blogPost
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBlogPost);
