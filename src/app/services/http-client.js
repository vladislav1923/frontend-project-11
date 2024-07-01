import axios from "axios";

const allOriginsWrapper = (url) => `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`

const config = {};

const client = axios.create(config);

export function get(url) {
    return client.get(allOriginsWrapper(url));
}
