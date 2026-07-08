import {
  createContext,
  useContext,
  useState,
} from "react";

type ModalMode = "login" | "register";

type ModalContextType = {
  isOpen: boolean;
  mode: ModalMode;

  openLogin: () => void;
  openRegister: () => void;
  closeModal: () => void;
  switchMode: () => void;
};

const ModalContext =
  createContext<ModalContextType>(
    {} as ModalContextType
  );

export function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] =
    useState(false);

  const [mode, setMode] =
    useState<ModalMode>("login");

  const openLogin = () => {
    setMode("login");
    setIsOpen(true);
  };

  const openRegister = () => {
    setMode("register");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const switchMode = () => {
    setMode((prev) =>
      prev === "login"
        ? "register"
        : "login"
    );
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        mode,
        openLogin,
        openRegister,
        closeModal,
        switchMode,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () =>
  useContext(ModalContext);