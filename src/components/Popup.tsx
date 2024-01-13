import React, { createContext, useContext, useState } from "react";
import { cn } from "~/utils/helpers";

type PopupContextType = {
  showPopup: (
    message: string,
    duration?: number,
    type?: "info" | "warning"
  ) => void;
};

type PopupState = {
  visible: boolean;
  message: string | null;
  type: "info" | "warning";
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
    visible: false,
    message: null,
    type: "info",
  });

  const showPopup = (
    message: string,
    duration = 2500,
    type: "info" | "warning" = "info"
  ) => {
    const transitionTime = 500;

    setPopupState({ visible: false, message, type });
    setTimeout(() => {
      setPopupState({ visible: true, message, type });
    }, 100);
    setTimeout(() => {
      setPopupState({ visible: false, message, type });
    }, duration - transitionTime);
    setTimeout(() => {
      setPopupState({ visible: false, message: null, type });
    }, duration);
  };

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      <Popup
        message={popupState.message}
        visible={popupState.visible}
        type={popupState.type}
      />
    </PopupContext.Provider>
  );
};

const Popup: React.FC<PopupState> = (props) => {
  return (
    <>
      {props.message && (
        <div
          className={cn(
            "fixed bottom-6 right-6 mb-4 flex items-center rounded-lg p-4 text-sm",
            props.type === "info"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          )}
          role="alert"
          style={{
            opacity: props.visible ? 1 : 0,
            transition: "all 0.5s",
          }}
        >
          <span className="relative mr-3 flex h-4 w-4">
            <span
              className={cn(
                "absolute h-full w-full animate-ping rounded-full opacity-75",
                props.type === "info" ? "bg-green-500" : "bg-red-500"
              )}
            />
            <svg
              className="absolute flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
          </span>
          <span className="font-medium">{props.message}</span>
        </div>
      )}
    </>
  );
};
