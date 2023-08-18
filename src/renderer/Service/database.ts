import CodeSnippetType from '../Interfaces/codeSnippet';
import fetch, { methodTypeEnum } from './fetch';
import errorHandler from './errorHandler';

const API_BASE_URL = 'http://localhost:3030/api/v1';

export async function getSnippets() {
  try {
    const { data: response } = await fetch({
      method: methodTypeEnum.get,
      url: `${API_BASE_URL}/snippet/`,
    });

    return response.data;
  } catch (error) {
    errorHandler(error);
    return '';
  }
}

export async function getSnippetById(id: string) {
  try {
    const { data: response } = await fetch({
      method: methodTypeEnum.get,
      url: `${API_BASE_URL}/snippet/${id}`,
    });

    return response.data;
  } catch (error) {
    errorHandler(error);
    return '';
  }
}

export async function addSnippet(newData: CodeSnippetType) {
  try {
    const { data: response } = await fetch({
      method: methodTypeEnum.post,
      url: `${API_BASE_URL}/snippet`,
      data: newData,
    });

    return response.data;
  } catch (error) {
    errorHandler(error);
    return '';
  }
}

export async function updateSnippetById(id: string, newData: CodeSnippetType) {
  try {
    const { code, description, language, title } = newData;
    const { data: response } = await fetch({
      method: methodTypeEnum.patch,
      url: `${API_BASE_URL}/snippet/${id}`,
      data: {
        code,
        description,
        language,
        title,
      },
    });

    return response.data;
  } catch (error) {
    errorHandler(error);
    return '';
  }
}

export async function deleteSnippetById(id: string) {
  try {
    const { data: response } = await fetch({
      method: methodTypeEnum.delete,
      url: `${API_BASE_URL}/snippet/${id}`,
    });

    return response.data;
  } catch (error) {
    errorHandler(error);
    return '';
  }
}
