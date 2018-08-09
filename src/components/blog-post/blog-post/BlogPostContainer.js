import {connect} from 'react-redux'
import BlogPost from './BlogPost';
import {GET_BLOG_POST_REQUESTED} from '../../../actions/blogPostActions';
import {selectBlogPostState} from '../../../selectors/blogPostSelector';


function mapStateToProps(state) {
  const {blogPosts, currentBlogPost} = selectBlogPostState(state);
  return {
    blogPosts,
    currentBlogPost
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    getBlogPost: bpid => dispatch({
      type: GET_BLOG_POST_REQUESTED,
      bpid
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);
