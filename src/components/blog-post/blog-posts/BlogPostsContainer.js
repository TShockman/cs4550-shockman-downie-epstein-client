import {connect} from 'react-redux'
import BlogPosts from './BlogPosts';
import {selectBlogPostState} from '../../../selectors/blogPostSelector';
import {QUERY_BLOG_POST_REQUESTED} from '../../../actions/blogPostActions';


function mapStateToProps(state) {
  const {blogPostsSearchResult} = selectBlogPostState(state);
  return {
    blogPosts: blogPostsSearchResult
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchBlogPosts: query => dispatch({
      type: QUERY_BLOG_POST_REQUESTED,
      query
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPosts);
