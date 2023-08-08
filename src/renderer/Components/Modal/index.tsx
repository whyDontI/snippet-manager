import React from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="button"
      onKeyDown={onClose}
      tabIndex={0}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="button"
        onKeyDown={(e) => e.stopPropagation()}
        tabIndex={0}
      >
        <button className={styles.closeButton} onClick={onClose} type="button">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
