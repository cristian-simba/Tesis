import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function NotifyError(text) {
  toast.error(text);
}

export function NotifySuccess(text) {
  toast.success(text);
}
