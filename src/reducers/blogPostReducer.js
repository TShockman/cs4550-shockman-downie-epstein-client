import {Record} from 'immutable';
import {
  DELETE_BLOG_POST_FULFILLED,
  DELETE_BLOG_POST_REQUESTED,
  GET_ALL_BLOG_POSTS_FULFILLED, GET_ALL_BLOG_POSTS_REQUESTED,
  GET_BLOG_POST_FULFILLED, GET_BLOG_POST_REQUESTED,
  GET_USER_BLOG_POSTS_FULFILLED, GET_USER_BLOG_POSTS_REQUESTED, QUERY_BLOG_POST_FULFILLED
} from '../actions/blogPostActions';
import {createdSort} from '../utils';

const BlogPostState = Record({
  blogPosts: [], // list of blogPosts
  currentBlogPost: null, // the current blogPost
  currentBlogPosts: [],
  blogPostsSearchResult: []
});

const initialState = new BlogPostState();

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BLOG_POSTS_REQUESTED: {
      return state.set('blogPosts', []);
    }
    case GET_USER_BLOG_POSTS_REQUESTED: {
      return state.set('currentBlogPosts', []);
    }
    case GET_BLOG_POST_REQUESTED: {
      return state.set('currentBlogPost', null);
    }
    case GET_BLOG_POST_FULFILLED: {
      const newBlogPosts = state.blogPosts.map(blogPost => blogPost.id === action.blogPost.id ? action.blogPost : blogPost);
      state = state.set('blogPosts', newBlogPosts);
      return state.set('currentBlogPost', action.blogPost);
    }
    case GET_ALL_BLOG_POSTS_FULFILLED: {
      const blogPosts = action.blogPosts;
      blogPosts.sort(createdSort);
      return state.set('blogPosts', blogPosts);
    }
    case GET_USER_BLOG_POSTS_FULFILLED: {
      return state.set('currentBlogPosts', action.blogPosts);
    }
    case DELETE_BLOG_POST_FULFILLED: {
      const {bpid} = action;
      state = state.set('blogPosts', state.blogPosts.filter(blogPost => blogPost.id !== bpid));
      state = state.set('currentBlogPosts', state.currentBlogPosts.filter(blogPost => blogPost.id !== bpid));
      state = state.set('currentBlogPost', state.currentBlogPost && state.currentBlogPost.id === bpid ? null : state.currentBlogPost);
      return state;
    }
    case QUERY_BLOG_POST_FULFILLED: {
      const {blogPosts} = action;
      return state.set('blogPostsSearchResult', blogPosts);
    }
    default: {
      return state;
    }
  }
}
