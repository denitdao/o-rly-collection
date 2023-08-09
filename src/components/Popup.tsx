import React, { createContext, useContext, useState } from "react";

type PopupContextType = {
  showPopup: (message: string, duration?: number) => void;
};

type PopupState = {
  visible: boolean;
  message: string | null;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [popupState, setPopupState] = useState<PopupState>({
    visible: true,
    message: "null",
  });

  const showPopup = (message: string, duration = 2500) => {
    const transitionTime = 500;

    setPopupState({ visible: false, message });
    setTimeout(() => {
      setPopupState({ visible: true, message });
    }, 100);
    setTimeout(() => {
      setPopupState({ visible: false, message });
    }, duration - transitionTime);
    setTimeout(() => {
      setPopupState({ visible: false, message: null });
    }, duration);
  };

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      <Popup message={popupState.message} visible={popupState.visible} />
    </PopupContext.Provider>
  );
};

const Popup: React.FC<PopupState> = (props) => {
  return (
    <>
      {props.message && (
        <div
          className="fixed bottom-6 right-6 mb-4 flex items-center rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
          role="alert"
          style={{
            opacity: props.visible ? 1 : 0,
            transition: "all 0.5s",
          }}
        >
          <svg
            className="mr-3 inline h-4 w-4 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="font-medium">{props.message}</span>
        </div>
      )}
    </>
  );
};
