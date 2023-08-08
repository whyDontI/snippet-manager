import CodeSnippetType from './codeSnippet';

export default interface DataBase {
  [key: number | string]: CodeSnippetType;
}
