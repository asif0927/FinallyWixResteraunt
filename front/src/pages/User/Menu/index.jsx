/*import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import style from './index.module.css';
import { getCategories } from '../../../api/categoryrequest';
import { getFoods } from '../../../api/foodrequest';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchFoods();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await getFoods();
      setFoods(response.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Menu</title>
        </Helmet>
      </div>
      <div style={{ marginTop: '50px' }}>
        <div className={style.section}>
            <h2 className={style.header}>Dinner Menu</h2>
        {categories.map((category, index) => (
          <section key={index} className={style.section}>
            <div className={style.container}>
              <div>
                <hr  className={style.hr}/>
                <h2 className={style.categoryName}>{category.name}</h2>
                <hr className={style.hr}/>
              </div>

              {foods
                .filter((food) => food.category === category._id)
                .map((food, foodIndex) => (
                  <div key={foodIndex} className={style.foodContainer}>
                  <img src={food.img} alt={food.name} className={style.image} />
                  <div className={style.details}>
                    <div className={style.namePriceContainer}>
                      <h3 className={style.foodName}>{food.name}</h3>
                      <h5 className={style.foodPrice}>{food.price}$</h5>
                    </div>
                    <p className={style.foodDescription}>{food.description}</p>
                  </div>
                </div>
                ))}
            </div>
            {index !== categories.length - 1}
          </section>
        ))}
        </div>
      </div>
    </>
  );
};

export default Menu;  */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import style from './index.module.css';
import { getCategories } from '../../../api/categoryrequest';
import { getFoods } from '../../../api/foodrequest';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchFoods();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await getFoods();
      setFoods(response.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Menu</title>
        </Helmet>
      </div>
      <div style={{ marginTop: '50px' }}>
        <div className={style.section}>
          <h2 className={style.header}>Dinner Menu</h2>
          {categories.map((category, index) => (
            <section key={index} className={style.section}>
              <div className={style.container}>
                <div>
                  <hr className={style.hr} />
                  <h2 className={style.categoryName}>{category.name}</h2>
                  <hr className={style.hr} />
                </div>

                {foods
                  .filter((food) => food.category === category._id)
                  .map((food, foodIndex) => (
                    <div key={foodIndex} className={style.foodContainer}>
                      <Link to={`/foods/${food._id}`} className={style.foodLink}>
                        <img src={food.img} alt={food.name} className={style.image} />
                        <div className={style.details}>
                          <div className={style.namePriceContainer}>
                            <h3 className={style.foodName}>{food.name}</h3>
                            <h5 className={style.foodPrice}>{food.price}$</h5>
                          </div>
                          <p className={style.foodDescription}>{food.description}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
              {index !== categories.length - 1}
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;

