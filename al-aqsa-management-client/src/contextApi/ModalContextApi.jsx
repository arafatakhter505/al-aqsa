import { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalContextApi = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [btn, setBtn] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [btnAction, setBtnAction] = useState(() => {});

  const modalInfo = {
    showModal,
    setShowModal,
    title,
    setTitle,
    btn,
    setBtn,
    modalContent,
    setModalContent,
    btnAction,
    setBtnAction,
  };
  return (
    <ModalContext.Provider value={modalInfo}>{children}</ModalContext.Provider>
  );
};

export default ModalContextApi;
