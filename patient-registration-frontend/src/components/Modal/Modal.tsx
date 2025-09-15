import React from "react";
import styles from "./Modal.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
}

const Modal = ({ children, isOpen, onClose, showCloseButton = true } : Props) => {
  //if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (

        <div className={styles.overlay}>
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              
              {showCloseButton && (
                <button className={styles.closeBtn} onClick={onClose}>
                ×
                </button>
              )}
              {children}
            </motion.div>
          
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;