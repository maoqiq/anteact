import fetch from 'isomorphic-fetch';

export default {
  fetchMedia(pageIndex, itemsPerPage) {
    return fetch(`/api/boards?page=${pageIndex}&itemsPerPage=${itemsPerPage}`);
  },
};
