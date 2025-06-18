import React from 'react'
import { useCart } from '../../hooks/useCart';
import classes from './cartPage.module.css';
import Title from '../../components/Title/Title';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';
import NotFound from '../../components/NotFound/NotFound';
export default function CartPage() {
    const {cart, removeFood, changeQuantity} = useCart();
  return (
    <>
    <Title title="Giỏ hàng" fontSize="3rem" margin="1.5rem 0 0 2.5rem"/>
    {cart.items.length === 0  ?(<NotFound message="Giỏ hàng trống" linkRoute="/" linkText="Trở về trang chủ"/>
    ) : (
        <div className={classes.container}>
            <ul className={classes.list}>
                {
                    cart.items.map(item => (
                        <li key={item.food.id}>
                            <div>
                            <img 
                                src={`/foods/${item.food.image?.split('/').pop()}`} 
                                alt={item.food.name}
                                onError={(e) => {
                                    e.target.src = '/foods/default.jpg'; // fallback ảnh mặc định
                                }}
                            />
                            </div>
                            <div>
                                <Link to={`/food/${item.food.id}`}>{item.food.name}</Link>
                            </div>
                            <div>
                                <select value={item.quantity} onChange={(e) => changeQuantity(item, Number(e.target.value))}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div>
                                <Price price={item.price}/>
                            </div>
                            <div>
                                <button className={classes.remove_button} onClick={() => removeFood(item.food.id)}>Xóa món ăn</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className={classes.checkout}>
                <div>
                    <div className={classes.foods_count}>{cart.totalCount} món ăn</div>
                    <div className={classes.total_price}><Price price={cart.totalPrice}/></div>
                </div>
                <Link to="/checkout" className={classes.checkout_button}>Đặt hàng</Link>
            </div>
        </div>
    )}
    </>
  )
}
