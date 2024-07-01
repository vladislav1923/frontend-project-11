import { get } from "./http-client";

export default function fetchPosts(url) {
    return get(url);
}
