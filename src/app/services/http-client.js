import axios from 'axios';

const allOriginsWrapper = (url) => `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`;

const config = {};

const client = axios.create(config);

export function get(url) {
  return client.get(allOriginsWrapper(url));
}
