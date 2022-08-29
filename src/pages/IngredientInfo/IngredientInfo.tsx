import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './IngredientInfo.module.css';
import clsx from 'clsx';
import { useSelector } from '../../utils/hooks';
import { TItem } from '../../utils/types';


function IngredientInfo() {
  const { id } = useParams<{id?: string}>();
  const items = useSelector((store) => store.mainReducer.ingredients);
  const item = items.find((el: TItem) => el._id === id);

  if (!item) {
    return <div></div>;
  }
  return (
    <div className={styles.bigCard}>
      <h1 className={styles.label + ' text text_type_main-large'}>
        Детали ингредиента
      </h1>

      <img src={item.image_large} alt="Ингредиент" className="mr-5 ml-5" />
      <p
        className={
          styles.bigCardName + ' text text_type_main-medium mt-4'
        }
      >
        {item.name}
      </p>
      <div className={styles.nutrients + ' mt-8 mb-15'}>
        <div className={styles.nutrient + ' mr-5'}>
          <p className="text text_type_main-default">Калории, ккал</p>
          <p className="text text_type_digits-default">{item.calories}</p>
        </div>
        <div className={styles.nutrient + ' mr-5'}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{item.proteins}</p>
        </div>
        <div className={styles.nutrient + ' mr-5'}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{item.fat}</p>
        </div>
        <div className={styles.nutrient}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{item.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

export default IngredientInfo;