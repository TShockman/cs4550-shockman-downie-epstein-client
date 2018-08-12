import {connect} from 'react-redux'
import ListBlogPosts from './ListBlogPosts';
import {selectBlogPostState} from '../../../selectors/blogPostSelector';
import {GET_ALL_BLOG_POSTS_REQUESTED} from '../../../actions/blogPostActions';

function mapStateToProps(state) {
  const {blogPosts} = selectBlogPostState(state);
  return {
    blogPosts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBlogPosts: () => dispatch({
      type: GET_ALL_BLOG_POSTS_REQUESTED
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBlogPosts);