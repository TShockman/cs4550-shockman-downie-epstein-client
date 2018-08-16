import {takeEvery, takeLatest, put, fork, all, call, select} from 'redux-saga/effects';
import {
  CREATE_BLOG_POST_FULFILLED,
  CREATE_BLOG_POST_REQUESTED,
  CREATE_BP_COMMENT_FULFILLED,
  CREATE_BP_COMMENT_REQUESTED,
  DELETE_BLOG_POST_FULFILLED,
  DELETE_BLOG_POST_REQUESTED,
  DELETE_BP_COMMENT_FULFILLED,
  DELETE_BP_COMMENT_REQUESTED,
  GET_ALL_BLOG_POSTS_FULFILLED,
  GET_ALL_BLOG_POSTS_REQUESTED,
  GET_BLOG_POST_FULFILLED,
  GET_BLOG_POST_REQUESTED,
  GET_USER_BLOG_POSTS_FULFILLED,
  GET_USER_BLOG_POSTS_REQUESTED,
  QUERY_BLOG_POST_FULFILLED,
  QUERY_BLOG_POST_REQUESTED,
  UPDATE_BP_FULFILLED,
  UPDATE_BP_REQUESTED
} from '../actions/blogPostActions';
import BlogPostService from '../services/BlogPostService';
import {redirect} from '../actions/navigationActions';
import {selectUserState} from '../selectors/userSelector';
import {GET_PROFILE_REQUESTED} from '../actions/userActions';
import CommentService from '../services/CommentService';
import UserService from '../services/UserService';
import {UPDATE_WR_FULFILLED} from '../actions/workRequestActions';

const blogPostService = BlogPostService.instance;
const commentService = CommentService.instance;
const userService = UserService.instance;

function * getBlogPostSaga({bpid}) {
  console.log('Getting blogPost:', bpid);
  const blogPost = yield call(blogPostService.getBlogPost, bpid);

  if (blogPost) {
    const owner = yield call(userService.getUser, blogPost.ownerId);
    if(owner) {
      blogPost.owner = owner;
      return yield put({type: GET_BLOG_POST_FULFILLED, blogPost});
    }
  }
  console.error('Failed to retrieve blogPost');
}

function * createBlogPostSaga({blogPost}) {
  console.log('Creating blogPost:', blogPost);
  const {user} = yield select(selectUserState);

  if (!user) {
    return console.error('Must be logged in to create a blogPost');
  }

  const newBlogPost = yield call(blogPostService.createBlogPostForUser, user, blogPost);

  if (newBlogPost) {
    yield put({type: CREATE_BLOG_POST_FULFILLED, blogPost: newBlogPost});
    yield put(redirect(`/blogPost/${newBlogPost.id}`));
  } else {
    console.error('Failed to create blogPost');
  }
}

function * getAllBlogPostsSaga() {
  console.log('Getting all blogPosts');

  const blogPosts = yield call(blogPostService.getAllBlogPosts);

  if (blogPosts) {
    yield put({type: GET_ALL_BLOG_POSTS_FULFILLED, blogPosts});
  } else {
    console.error('Failed to fetch blogPosts');
  }
}

function * getUserBlogPostsSaga({user}) {
  console.log('Getting blogPosts for user:', user.id);

  const blogPosts = yield call(blogPostService.getAllBlogPostsForUser, user);

  if (blogPosts) {
    yield put({type: GET_USER_BLOG_POSTS_FULFILLED, blogPosts});
  } else {
    console.error('Failed to retrieve blogPosts');
  }
}

function * deleteBlogPostSaga({bpid}) {
  console.log('Deleting blogPost:', bpid);

  const success = yield call(blogPostService.deleteBlogPost, bpid);

  if (success) {
    yield put({type: DELETE_BLOG_POST_FULFILLED, bpid});
    yield put({type: GET_PROFILE_REQUESTED});
  } else {
    console.error('Failed to delete blogPost');
  }
}

function * queryBlogPostSaga({query}) {
  console.log('Querying blogPosts:', query);

  const blogPosts = yield call(blogPostService.searchBlogPosts, query);

  if (blogPosts) {
    yield put({type: QUERY_BLOG_POST_FULFILLED, blogPosts});
  } else {
    console.error('Failed to query blogPosts');
  }
}

function * createCommentSaga({comment, bpid}) {
  console.log('Creating comment on blog post:', comment, bpid);

  const newComment = yield call(blogPostService.addComment, comment, bpid);

  if (newComment) {
    yield put({type: CREATE_BP_COMMENT_FULFILLED, comment: newComment});
    yield put({type: GET_BLOG_POST_REQUESTED, bpid});
  } else {
    console.error('Failed to create comment');
  }
}

function * deleteCommentSaga({cid, bpid}) {
  console.log('Deleting comment from blog post', cid, bpid);
  const deleted = yield call(commentService.deleteComment, cid);

  if (deleted) {
    yield put({type: DELETE_BP_COMMENT_FULFILLED, cid, bpid});
    yield put({type: GET_BLOG_POST_REQUESTED, bpid});
  } else {
    console.error('Failed to delete comment');
  }
}

function * updateBlogPostSaga({blogPost}) {
  console.log('Updating blog post:', blogPost);
  const updated = yield call(blogPostService.updateBlogPost, blogPost);

  if (updated) {
    yield put({type: UPDATE_BP_FULFILLED, blogPost: updated});
    yield put(redirect(`/blogPost/${blogPost.id}`));
  } else {
    console.error('Failed to update blog post');
  }
}

export default function * rootSaga () {
  yield all([
    fork(takeEvery, GET_BLOG_POST_REQUESTED, getBlogPostSaga),
    fork(takeEvery, CREATE_BLOG_POST_REQUESTED, createBlogPostSaga),
    fork(takeLatest, GET_ALL_BLOG_POSTS_REQUESTED, getAllBlogPostsSaga),
    fork(takeLatest, GET_USER_BLOG_POSTS_REQUESTED, getUserBlogPostsSaga),
    fork(takeLatest, DELETE_BLOG_POST_REQUESTED, deleteBlogPostSaga),
    fork(takeLatest, QUERY_BLOG_POST_REQUESTED, queryBlogPostSaga),
    fork(takeEvery, CREATE_BP_COMMENT_REQUESTED, createCommentSaga),
    fork(takeEvery, DELETE_BP_COMMENT_REQUESTED, deleteCommentSaga),
    fork(takeEvery, UPDATE_BP_REQUESTED, updateBlogPostSaga)
  ])
}