import {connect} from 'react-redux'
import {REGISTER_USER_REQUESTED} from '../../actions/userActions';
import Homepage from './Homepage';
import {selectUserState} from '../../selectors/userSelector';
import {selectListingState} from '../../selectors/listingSelector';
import {GET_ALL_LISTINGS_REQUESTED} from '../../actions/listingActions';
import {selectWorkRequestState} from '../../selectors/workRequestSelector';
import {GET_ALL_WORK_REQUESTS_REQUESTED} from '../../actions/workRequestActions';
import {selectBlogPostState} from '../../selectors/blogPostSelector';
import {GET_ALL_BLOG_POSTS_REQUESTED} from '../../actions/blogPostActions';


function mapStateToProps(state) {
  const {listings} = selectListingState(state);
  const {workRequests} = selectWorkRequestState(state);
  const {blogPosts} = selectBlogPostState(state);
  return {
    listings,
    workRequests,
    blogPosts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getListings: () => dispatch({
      type: GET_ALL_LISTINGS_REQUESTED
    }),
    getWorkRequests: () => dispatch({
      type: GET_ALL_WORK_REQUESTS_REQUESTED
    }),
    getBlogPosts: () => dispatch({
      type: GET_ALL_BLOG_POSTS_REQUESTED
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);