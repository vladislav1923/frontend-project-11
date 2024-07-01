import { v4 } from 'uuid';

export default function parseRss(dom) {
    const feedId = v4();
    const result = {
        feed: {
            feedId,
            title: dom.querySelector('title').textContent,
            desc: dom.querySelector('description').textContent,
        },
        posts: []
    }

    result.posts = Array.from(dom.querySelectorAll('item')).map((item) => {
        return {
            feedId,
            title: item.querySelector('title').textContent,
            desc: item.querySelector('description').textContent,
            link: item.querySelector('link').textContent,
        }
    })

    return result;
}
