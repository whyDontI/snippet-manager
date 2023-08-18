import { AxiosError } from 'axios';

type ServerError = {
  message: string,
  data: any,
};

export { AxiosError };
export default ServerError;
