export default function extractNewPosts (currentPosts, posts) {
  const currentPostsUrls = currentPosts.map((post) => post.url);
  return posts.filter((post) => !currentPostsUrls.includes(post.url));
}
