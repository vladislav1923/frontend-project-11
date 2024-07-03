import DomParser from "./dom-parser";

export default function parseXML(xml, error) {
    return new Promise((res, rej) => {
        try {
            const dom = DomParser.parseFromString(xml, 'text/xml');
            const rss = dom.querySelector('rss');
            if (!rss) {
                rej(error);
            } else {
                res(dom);
            }
        } catch {
            rej(error);
        }
    })
}
