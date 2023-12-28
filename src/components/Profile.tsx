import React, { useContext, useState } from 'react';
import styles from '../styles/pages/Profile.module.scss';
import { ChallengesContext } from '@/contexts/ChallengesContext';
import { ModalContext } from '@/contexts/ModalUserNameContext';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const { 
      isModalOpen,
      editableName,
      handleEditClick,
      handleSaveClick,
      handleCancelClick,
      handleTextareaKeyDown,
      setEditableName
   } = useContext(ModalContext);

  return (
    <div className={`${isModalOpen ? styles.userModalOpen : styles.profileContainer}`}>
      {!isModalOpen && (
        <>
          <img src="/FitFlow.PNG" alt="Nome do Usuário" />
          <div>
            <strong>
              <span onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                {editableName || 'Adicionar Nome'}
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
        <div className={styles.userNameModal}>
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
