import {
  createContext,
  useContext,
  useState,
} from "react";

type ActionContextType = {
  pendingAction: (() => void) | null;

  setPendingAction: (
    action: (() => void) | null
  ) => void;

  runPendingAction: () => void;
};

const ActionContext =
  createContext<ActionContextType>(
    {} as ActionContextType
  );

export function ActionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    pendingAction,
    setPendingAction,
  ] = useState<(() => void) | null>(
    null
  );

  const runPendingAction = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  return (
    <ActionContext.Provider
      value={{
        pendingAction,
        setPendingAction,
        runPendingAction,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
}

export const useAction = () =>
  useContext(ActionContext);