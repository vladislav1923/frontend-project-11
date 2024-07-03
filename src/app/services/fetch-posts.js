import get from './http-client';

export default function fetchPosts(url, error) {
  return new Promise((res, rej) => {
    get(url)
      .then((response) => {
        res(response);
      })
      .catch(() => {
        rej(error);
      });
  });
}
