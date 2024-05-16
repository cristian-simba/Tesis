import useAuth from "../../context/useAuth";
import ModeratorDialog from "./ModeratorDialog";
import { ToastContainer } from 'react-toastify';

export default function Moderadores() {
  const user = useAuth();
  const id = user?.cookies?.auth?._id;
  const token = user?.cookies?.auth?.token;

  return (
    <div>

        <ModeratorDialog id={id} token={token} />
    </div>
  );
}