/* eslint-disable no-unused-vars */
import axios, { AxiosError } from 'axios';

// eslint-disable-next-line no-shadow
export enum methodTypeEnum {
  get = 'get',
  post = 'post',
  patch = 'patch',
  delete = 'delete',
}

type fetchParams = {
  url: string;
  method?: methodTypeEnum;
  params?: any;
  data?: any;
  headers?: any;
  options?: any;
  withCredentials?: boolean;
};

/**
 * Used for network calls
 * @param arg {Object}
 * @param arg.url {String} - API Endpoint URL
 * @param arg.method {String} - API Call Method (GET, POST etc.)
 * @param arg.params {Object} - Query Params for the API call
 * @param arg.data {Object} - Body to be sent
 * @param arg.headers {Object} - Headers to be sent
 * @param arg.options {Object} - Options to be sent via axios
 */

const fetch = async ({
  url,
  method = methodTypeEnum.get,
  params = null,
  data = null,
  headers = null,
  options = {},
  withCredentials = true,
}: fetchParams): Promise<any> =>
  axios({
    method,
    url,
    params,
    data,
    headers: {
      'Content-type': 'Application/JSON',
      ...headers,
    },
    withCredentials,
    ...options,
  });

const isAxiosError = <ResponseType>(
  error: unknown
): error is AxiosError<ResponseType> => axios.isAxiosError(error);

export { AxiosError, isAxiosError };
export default fetch;
