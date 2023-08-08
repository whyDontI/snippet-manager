import { retrieveValue, storeValue } from './localStorage';
import CodeSnippetType from '../Interfaces/codeSnippet';

const DATABASE_NAME = 'SnippetVault';

export function getItemById(id: string) {
  const data = retrieveValue(DATABASE_NAME);
  return data[id];
}

export function updateItemById(id: string, newData: CodeSnippetType) {
  const data = retrieveValue(DATABASE_NAME);
  storeValue(DATABASE_NAME, {
    ...data,
    [id]: newData,
  });
}

export function deleteItemById(id: string) {
  const data = retrieveValue(DATABASE_NAME);
  delete data[id];
  storeValue(DATABASE_NAME, data);
}
