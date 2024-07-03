import { string } from 'yup';

const schema = string().url().required();

export default function urlValidator(value, error) {
  return schema.validate(value).catch(() => Promise.reject(error));
}
