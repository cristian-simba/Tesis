import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NotifieError(text) {
  return toast.error(text);
}
