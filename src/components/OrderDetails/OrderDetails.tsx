import React from 'react';
import { useSelector } from '../../utils/hooks';

import styles from './OrderDetails.module.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails() {
  const order = useSelector((store) => store.mainReducer.order);
  return (
    <div className={styles.main}>
      <p className={clsx(styles.order,' text text_type_digits-large')}>
        {order}
      </p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <section className={'mt-15'}>
        <svg  width="120" height="120" viewBox="0 0 24 24" fill="#ffffff">
          <CheckMarkIcon type="secondary" />
        </svg>
      </section>
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className={'text text_type_main-default text_color_inactive mt-2 mb-30'}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
