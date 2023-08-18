import { toast } from 'react-toastify';
import { isAxiosError } from './fetch';
import ServerError from '../Interfaces/error';

const handleError = (error: any, show: boolean = true) => {
  if (!show) return;
  if (isAxiosError<ServerError>(error)) {
    // Don't show failed API error
    if (error.response?.data?.message) {
      toast(error.response?.data?.message);
    } else {
      toast(error?.message);
    }
    return;
  }
  toast((error as Error).message);
};

export default handleError;
