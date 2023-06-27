import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import style from './index.module.css';
import { getFoodById } from '../../../api/foodrequest';

const FoodDetail = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    try {
      const response = await getFoodById(id);
      setFood(response.data);
    } catch (error) {
      console.error('Error fetching food:', error);
    }
  };

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Food Detail</title>
        </Helmet>
      </div>
      <div style={{ marginTop: '50px' }}>
      <div className={style.section}>
        <div className={style.container}>
        {food && (
          <div className={style.foodContainer}>
            <img src={food.img} alt={food.name} className={style.image} />
            <div className={style.details}>
              <h2 className={style.foodName}>{food.name}</h2>
              <p className={style.foodDescription}>{food.description}</p>
              <p className={style.foodPrice}>{food.price}$</p>
            </div>
          </div>
        )}
        </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetail;
