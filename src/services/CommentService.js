import {BLOG_POST_QUERY_URL, BLOG_POST_URL, COMMENT_URL, parseResponse, USER_URL} from './api';

const _singleton = Symbol();

export default class CommentService {
  constructor(singletonToken) {
    if(_singleton !== singletonToken) {
      throw new Error('Cannot instantiate directly');
    }
  }

  static get instance() {
    if(!this[_singleton]) {
      this[_singleton] = new CommentService(_singleton);
    }
    return this[_singleton];
  }

  deleteComment(cid) {
    return fetch(`${COMMENT_URL}/${cid}`, {
      method: 'delete',
      credentials: 'include'
    })
      .then(response => response.ok);
  }
}