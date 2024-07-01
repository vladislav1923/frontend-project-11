import { string } from 'yup';

const schema = string().url().required();

export default function duplicateFeedValidator(feeds, value, error) {
    return new Promise((res, rej) => {
        const found = feeds.find((feed) => feed.url === value);
        if (found) {
            rej(error);
        }
        res();
    });
}
