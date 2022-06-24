import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const portalRoot = document.getElementById('portal-modals');

function Modal(props) {

    const handlerEsc = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            modalOverlayClick();
        }
    }

    const modalOverlayClick = () => {
        props.setModaClose();
    }

    React.useEffect(() => {
        document.addEventListener('keydown', handlerEsc);
        return () => {
            document.removeEventListener('keydown', handlerEsc);
        };
    }, []);

    return ReactDOM.createPortal(
        <div>
            <ModalOverlay onClick={modalOverlayClick} />
            <div className={styles.modal}>
                <div className={clsx(styles.header,' mt-10 mr-10 ml-10')}>
                    <h1 className={' text text_type_main-large'}>
                        {props.header}
                    </h1>
                    <section className={styles.closeButton} onClick={props.setModaClose}>
                        <CloseIcon type="secondary" />
                    </section>
                </div>
                <div>{props.children}</div>
            </div>
        </div>,
        portalRoot
    );
}

export default Modal;

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    setModaClose: PropTypes.func.isRequired,
    header: PropTypes.string,
};