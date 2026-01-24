import { createContext, useState } from "react";

export let AuthModalContext = createContext();

export default function AuthModalContextProvider(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [onLoginSuccess, setOnLoginSuccess] = useState(null);

  const openModal = (callback) => {
    setOnLoginSuccess(() => callback);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setOnLoginSuccess(null);
  };

  return (
    <AuthModalContext.Provider value={{ isOpen, openModal, closeModal, onLoginSuccess }}>
      {props.children}
    </AuthModalContext.Provider>
  );
}
