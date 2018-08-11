import {BLOG_POST_QUERY_URL, BLOG_POST_URL, parseResponse, USER_URL} from './api';

const _singleton = Symbol();

export default class BlogPostService {
  constructor(singletonToken) {
    if(_singleton !== singletonToken) {
      throw new Error('Cannot instantiate directly');
    }
  }

  static get instance() {
    if(!this[_singleton]) {
      this[_singleton] = new BlogPostService(_singleton);
    }
    return this[_singleton];
  }

  getAllBlogPosts() {
    return fetch(BLOG_POST_URL)
      .then(parseResponse);
  }

  getAllBlogPostsForUser(user) {
    return fetch(`${USER_URL}/${user.id}/blogPost`)
      .then(parseResponse);
  }

  createBlogPostForUser(user, blogPost) {
    return fetch(`${USER_URL}/${user.id}/blogPost`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blogPost)
    })
      .then(parseResponse);
  }

  getBlogPost(bpid) {
    return fetch(`${BLOG_POST_URL}/${bpid}`)
      .then(parseResponse);
  }

  deleteBlogPost(bpid) {
    return fetch(`${BLOG_POST_URL}/${bpid}`, {
      method: 'delete'
    })
      .then(response => response.ok);
  }

  searchBlogPosts(query) {
    return fetch(BLOG_POST_QUERY_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/text'
      },
      body: query
    }).then(parseResponse);
  }

  addComment(comment, bpid) {
    return fetch(`${BLOG_POST_URL}/${bpid}/comment`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(comment)
    }).then(parseResponse);
  }
}