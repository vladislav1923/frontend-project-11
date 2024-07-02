import extractNewPosts from './extract-new-posts';
import fetchPosts from './fetch-posts';
import { getFeedsHTML, getPostsHTML } from './html-gen';
import parseXML from './parse-xml';
import parseRSS from './parse-rss';

export {
    getFeedsHTML,
    getPostsHTML,
    extractNewPosts,
    fetchPosts,
    parseRSS,
    parseXML,
}
