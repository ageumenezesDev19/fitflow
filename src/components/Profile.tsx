import React, { useContext, useState } from 'react';
import styles from '../styles/pages/Profile.module.scss';
import { ChallengesContext } from '@/contexts/ChallengesContext';

interface handleTextareaKeyDownProps {
  key: string;
  shiftKey: any;
  preventDefault: () => void;
}

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableName, setEditableName] = useState("Adicionar Nome");

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

  const handleTextareaKeyDown = (e: handleTextareaKeyDownProps) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveClick();
    }
  };

  const validateName = (name: string) => {
    return name.trim() !== '' && name.split('\n').length === 1 && name.length <= 28;
  };

  return (
    <div className={`${isModalOpen ? styles.modalOpen : styles.profileContainer}`}>
      {!isModalOpen && (
        <>
          <img src="/FitFlow.PNG" alt="Nome do Usuário" />
          <div>
            <strong>
              <span onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                {editableName}
              </span>
            </strong>
            <p>
              <img src="icons/level.svg" alt="" />
              Level {level}
            </p>
          </div>
        </>
      )}

      {isModalOpen && (
        <div className={styles.modal}>
          <textarea
            value={editableName}
            onChange={(e) => setEditableName(e.target.value)}
            onKeyDown={handleTextareaKeyDown}
          />
          <button className={styles.saveB} onClick={handleSaveClick}>Salvar</button>
          <button className={styles.cancelB} onClick={handleCancelClick}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
