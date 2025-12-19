import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'; 
import './Dialog.css'

function Dialog({ header, isOpen, onClose, children, confirmLabel , hasCancel = true }) {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('DialogModalOpen');
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    onClose('dismiss');
                }
            };
            window.addEventListener('keydown', handleEscape);
            
            return () => {
                document.body.classList.remove('DialogModalOpen');
                window.removeEventListener('keydown', handleEscape);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    const handleAction = (actionType) => {
        onClose(actionType);
    };

    return ReactDOM.createPortal(
        <div className="Dialog DialogModal">
            <div className="DialogModalWrap">
                <div className="DialogHeader">{header}</div>
                <div className="DialogBody">{children}</div>
                <div className="DialogFooter">
                    {hasCancel && (
                        <span 
                            className="DialogDismiss" 
                            onClick={() => handleAction('dismiss')}>
                            Cancelar
                        </span>
                    )}
                    <button className='button-dialog' onClick={() => handleAction('confirm')}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Dialog;