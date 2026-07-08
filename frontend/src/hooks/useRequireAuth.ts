import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { useAction } from "../context/ActionContext";

export function useRequireAuth() {
  const { user } = useAuth();

  const { openLogin } =
    useModal();

  const {
    setPendingAction,
  } = useAction();

  const requireAuth = (
    action: () => void
  ) => {
    if (user) {
      action();
      return;
    }

    setPendingAction(() => action);

    openLogin();
  };

  return requireAuth;
}