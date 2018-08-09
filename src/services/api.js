//export const API_URL = 'http://localhost:8080/api';
export const API_URL = 'https://designs-r-us-backend.herokuapp.com/api';
export const USER_URL = `${API_URL}/user`;
export const LOGIN_URL = `${API_URL}/login`;
export const LOGOUT_URL = `${API_URL}/logout`;
export const PROFILE_URL = `${API_URL}/profile`;
export const LISTING_URL = `${API_URL}/listing`;
export const LISTING_QUERY_URL = `${LISTING_URL}/search`;
export const WORK_REQUEST_URL = `${API_URL}/workRequest`;
export const WORK_REQUEST_QUERY_URL = `${WORK_REQUEST_URL}/search`;
export const BLOG_POST_URL = `${API_URL}/blogPost`;
export const BLOG_POST_QUERY_URL = `${BLOG_POST_URL}/search`;

export const parseResponse = response => {
  if (response.ok) {
    return response.json()
  }
  return null;
};