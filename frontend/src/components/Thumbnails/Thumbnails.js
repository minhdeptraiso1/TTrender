//thân trang chủ
import React from 'react'
import { Link } from 'react-router-dom'
import classes from './thumbnails.module.css'
import StarRatiing from '../StarRating/StarRatiing'
import Price from '../Price/Price'

export default function Thumbnails({foods}) {
    return (
        <ul className={classes.list}>
            {
                foods.map(food => (
                    <li key={food.id}>
                        <Link to={`/food/${food.id}`}>
                        <img
                            className={classes.image}
                            src={`/foods/${food.image.replace('/food/', '')}`}
                            alt={food.name}
                            onError={(e) => {
                                console.log('Lỗi load ảnh:', e.target.src);
                                e.target.src = '/foods/huy.jpg';
                            }}
                            />
                        </Link>
                        <div className={classes.content}>
                            <div className={classes.name}>{food.name}</div>
                            <span className={`${classes.favorite} ${
                                food.favorite ? '' : classes.not
                            }`} >
                                ♥
                            </span>
                            <div className={classes.stars}>
                                <StarRatiing stars={food.stars}/>
                            </div>
                            <div className={classes.product_item_footer}>
                            <div className={classes.origins}>
                                {food?.origins?.length > 0 ? (
                                    food.origins.map(origin => (
                                    <span key={origin} className={classes.originItem}>
                                        {origin}
                                    </span>
                                    ))
                                ) : (
                                    <span className={classes.noOrigin}>Không có nguồn gốc</span>
                                )}
                                </div>
                                <div className={classes.cookTime}>
                                    <span>Thời gian nấu:</span>
                                    <span>{food.cookTime}</span>
                                </div>
                            </div>
                            <div className={classes.price}>
                                <span>Giá: <Price price={food.price}/></span>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}