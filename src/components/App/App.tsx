import React, { useEffect, ReactElement, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import styles from "./App.module.css";

import AppHeader  from '../AppHeader/AppHeader';
import BurgerMain from '../BurgerMain/BurgerMain';
import Modal from '../Modal/Modal';
import NotFound404 from '../NotFound404/NotFound404';
import  ProtectedRoute  from '../ProtectedRoute/ProtectedRoute';

import { DELETE_DETAILS } from '../../services/actions';
import { getData } from '../../services/actions/mainAction';

import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';

import IngredientInfo from '../../pages/IngredientInfo/IngredientInfo';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { Location } from 'history';

type TLocationState = {
  background: Location;
}

function App() {
  
  const [modalStatus, setStatusModa] = React.useState(false);
  const [modalHeader, setModalHeader] = React.useState('');
  const [modalContent, setModalContent] = React.useState<ReactNode | ''>('');

  const history = useHistory();
  let location = useLocation<TLocationState>();
  const dispatch = useDispatch<any>();

  let switchBack;
  if (history.action === 'PUSH' || history.action === 'REPLACE') {
    switchBack = location.state && location.state.background;
  } else {
    switchBack = undefined;
  }

  function setIngredientModalClose() {
    history.goBack();
  }

  const setModalOpen = (newModalContent: ReactNode, modalLabel = 'Modal') =>  {
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

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

    return (
      <div>
        <Switch location={switchBack || location}>
          <Route path="/" exact>
            {/* @ts-ignore */}
            <AppHeader className={styles.header} />
            <BurgerMain setModalOpen={setModalOpen} />
            {modalStatus && (
              <Modal setModaClose={setModaClose} header={modalHeader}>
                {modalContent}
              </Modal>
            )}
          </Route>
          <Route path="/login">
            <AppHeader />
            <Login />
          </Route>
          <Route path="/register">
            <AppHeader />
            <Register />
          </Route>
          <Route path="/forgot-password">
            <AppHeader />
            <ForgotPassword />
          </Route>
          <Route path="/reset-password">
            <AppHeader />
            <ResetPassword />
          </Route>
          <ProtectedRoute path="/profile">
            <AppHeader />
            <Profile />
          </ProtectedRoute>
          <Route path="/ingredients/:id">
            <AppHeader />
            <IngredientInfo />
          </Route>
          <Route path="/">
            <AppHeader />
            <NotFound404 />
          </Route>
        </Switch>
        {switchBack && (
          <Route path="/ingredients/:id">
            <Modal setModaClose={setIngredientModalClose} header={'Детали ингредиента'}>
              <IngredientDetails />
            </Modal>
          </Route>
        )}
      </div>
    );

}

export default App;