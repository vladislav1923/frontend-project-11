import { string } from 'yup';

const schema = string().url().required();

export default function urlValidator(value) {
    return schema.validate(value).catch(() => Promise.reject('Ссылка должна быть валидным URL'));
}
