import React from 'react';
import './ConfirmationModal.css';

function ConfirmationModal({ showModal, closeModal, children }) {
    if (!showModal) return null; // Only render the modal if showModal is true

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="modal-close" onClick={closeModal}>
                    &times;
                </span>
                {children}
            </div>
        </div>
    );
}

export default ConfirmationModal;
