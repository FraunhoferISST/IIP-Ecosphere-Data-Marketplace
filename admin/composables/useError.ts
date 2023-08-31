import { useToast } from "vue-toastification";
import { AxiosError } from "axios";
const errorToast = useToast().error;

const getErrorMessage = (e: AxiosError | unknown) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  e?.response?.data?.message ?? e?.message ?? e?.toString() ?? e;

interface UseError {
  notify: (e: AxiosError | unknown) => void;
  getErrorMessage: (e: AxiosError | unknown) => string;
}

export const useError = (): UseError => {
  return {
    notify: (e: AxiosError | unknown) =>
      errorToast(getErrorMessage(e), { timeout: 8000 }),
    getErrorMessage,
  };
};
