import { createContext, ReactNode, useState, KeyboardEvent, useEffect } from "react";
import Cookies from 'js-cookie';

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
  editableName: string,
}

export const ModalContext = createContext({} as ModalContextData);

export function ModalProvider({ children, ...rest }: ModalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableName, setEditableName] = useState(rest.editableName ?? "");

  useEffect(() => {
    Cookies.set('editableName', String(editableName));
  }, [editableName]);

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
