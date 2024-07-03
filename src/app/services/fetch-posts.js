import { get } from "./http-client";

export default function fetchPosts(url, error) {
  return new Promise(async (res, rej) => {
    try {
      const response = await get(url);
      res(response);
    } catch {
      rej(error);
    }
  });
}
