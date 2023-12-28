import { createContext, ReactNode, useState, KeyboardEvent } from "react";

interface ModalContextData {
  isModalOpen: boolean;
  editableName: string;
  handleEditClick: () => void;
  handleSaveClick: () => void;
  handleCancelClick: () => void;
  handleTextareaKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  setEditableName: (name: string) => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalContext = createContext({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableName, setEditableName] = useState("");

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveClick = () => {
    if (validateName(editableName)) {
      setIsModalOpen(false);
    } else {
      alert('Por favor, insira um nome válido.');
    }
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveClick();
    }
  };

  const validateName = (name: string) => {
    return name.trim() !== '' && name.split('\n').length === 1 && name.length <= 28;
  };

  return (
    <ModalContext.Provider value={{
      isModalOpen,
      editableName,
      handleEditClick,
      handleSaveClick,
      handleCancelClick,
      handleTextareaKeyDown,
      setEditableName
    }}>
      {children}
    </ModalContext.Provider>
  );
}
