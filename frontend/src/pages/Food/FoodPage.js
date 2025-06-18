import React, { useEffect, useState } from 'react'
import classes from './foodPage.module.css'
import { useParams } from 'react-router-dom'
import { getFoodById } from '../../services/foodService';
import StarRatiing from '../../components/StarRating/StarRatiing'
import Price from '../../components/Price/Price'
import Tags from '../../components/Tags/Tags'
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound';
export default function FoodPage() {
  const [food, setFood] = useState({});
  const {foodId} = useParams();
  const {addFood} = useCart();
  const navigate = useNavigate();  
  const handleAddFood = () => {
    addFood(food); // truyền đúng object
    navigate('/cart');
}

  useEffect(() => {
    getFoodById(foodId).then(setFood);
  }, [foodId]);
    return (
    <>
        {!food ? (
            <NotFound/>
        ) : (
            <div className={classes.container}>
                <img className={classes.image} 
                  src={`/foods/${food.image?.split('/').pop()}`} 
                  alt={food.name} 
                  onError={(e) => {
                    console.log('Lỗi load ảnh:', e.target.src);
                    e.target.src = '/foods/huy.jpg'; // ảnh mặc định nếu lỗi
                }}/>
                <div className={classes.details}>
                  <div className={classes.header}>
                    <span className={classes.name}>{food.name}</span>
                    <span className={`${classes.favorite} ${
                      food.favorite ? '' : classes.not
                    }`}>
                      ♥
                    </span>
                    <div className={classes.rating}>
                      <StarRatiing stars={food.stars} size={25}/>
                    </div>
                    <div className={classes.origins}>
                      {food.origins?.length > 0 ? (
                        food.origins.map(origin => (
                          <span key={origin} className={classes.originItem}>
                            {origin}
                          </span>
                        ))
                      ) : (
                        <span className={classes.noOrigin}>Không có nguồn gốc</span>
                      )}
                    </div>
                    <div className={classes.tags}>
                      {food.tags?.length > 0 ? (
                        <Tags tags={food.tags.map(tag => ({name: tag}))}
                        forFoodPage={true}/>
                      ) : (
                        <span className={classes.noTags}>Không có tag</span>
                      )}
                    </div>
                    <div className={classes.cookTime}>
                      <span>Thời gian nấu: <strong>{food.cookTime}</strong> Phút</span>
                    </div>
                    <div className={classes.price}>
                      <Price price={food.price}/>
                    </div>
                  </div>
                  <button className={classes.button} onClick={handleAddFood}>Thêm vào giỏ hàng</button>
                </div>
            </div>
        )} 
    </>
    )
  
}
