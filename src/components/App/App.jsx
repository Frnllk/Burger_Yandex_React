import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './App.module.css';

import AppHeader  from '../AppHeader/AppHeader';
import BurgerMain from '../BurgerMain/BurgerMain';
import Modal from '../Modal/Modal';
import { DELETE_DETAILS } from '../../services/actions';
import { getData } from '../../services/actions/mainAction';

function App() {
  
  const [modalStatus, setStatusModa] = React.useState(false);
  const [modalHeader, setModalHeader] = React.useState(null);
  const [modalContent, setModalContent] = React.useState(null);

  const dispatch = useDispatch();

  const setModalOpen = (newModalContent, modalLabel = 'Modal') =>  {
    setModalHeader(modalLabel);
    setModalContent(newModalContent);
    setStatusModa(true);
  }

  const setModaClose = () => {
    setStatusModa(false);
    dispatch({
      type: DELETE_DETAILS,
    });
  }

  React.useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

    return (
      <div>
        <AppHeader className={styles.header}/>
        <BurgerMain  setModalOpen={setModalOpen}/>
        {modalStatus && 
          (<Modal header={modalHeader} setModaClose={setModaClose}>
            {modalContent}
          </Modal>
        )}
      </div>
    );

}

export default App;
