import moment from 'moment';

export const parseResponse = response => {
  if (response.ok) {
    return response.json();
  }
  return null;
};

export const createdSort = (a, b) => a.created < b.created ? 1 : a.created > b.created ? -1 : 0;

export const formatDate = iso => moment(iso).format('MMM Do YY, h:mm a');