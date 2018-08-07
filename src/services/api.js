export const API_URL = 'https://designs-r-us-backend.herokuapp.com/api';
export const USER_URL = `${API_URL}/user`;
export const LOGIN_URL = `${API_URL}/login`;
export const LOGOUT_URL = `${API_URL}/logout`;
export const PROFILE_URL = `${API_URL}/profile`;
export const WORK_REQUEST_URL = `${API_URL}/workRequest`;
export const LISTING_URL = `${API_URL}/listing`;

export const parseResponse = response => {
  if (response.ok) {
    return response.json()
  }
  return null;
};