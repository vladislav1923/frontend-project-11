import DomParser from "./dom-parser";

export default function parseXML(xml, error) {
    return new Promise((res, rej) => {
        try {
            res(DomParser.parseFromString(xml, 'text/xml'));
        } catch {
            rej(error);
        }
    })
}
