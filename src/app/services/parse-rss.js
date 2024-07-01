import { v4 } from 'uuid';

export default function parseRss(dom) {
    const result = {
        feed: {
            feedId: v4(),
            title: dom.querySelector('title').textContent,
            desc: dom.querySelector('description').textContent,
        },
        items: []
    }

    result.items = Array.from(dom.querySelectorAll('item')).map((item) => {
        return {
            title: item.querySelector('title').textContent,
            desc: item.querySelector('description').textContent,
            link: item.querySelector('link').textContent,
        }
    })

    return result;
}
