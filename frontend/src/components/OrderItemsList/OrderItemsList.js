import React from 'react'
import classes from './orderItemsList.module.css'
import {Link} from 'react-router-dom'
import Price from '../Price/Price'
export default function OrderItemsList({order}) {
  return (
    <table className={classes.table}>
        <tbody>
            <tr>
                <td>
                    ảnh
                </td>
                <td>
                    tên
                </td>
                <td>
                    giá
                </td>
                <td>
                    số lượng
                </td>
                <td>
                    thành tiền
                </td>
            </tr>
            {
                order.items.map((item, index) => (
                    <tr key={item.food.id}>
                        <td>
                            <Link to={`/food/${item.food.id}`}>
                                <img src={`/foods/${item.food.image?.split('/').pop()}`} alt={item.food.name} />
                            </Link>
                        </td>
                        <td>{item.food.name}</td>
                        <td><Price price={item.food.price}/></td>
                        <td>{item.quantity}</td>
                        <td><Price price={item.price}/></td>
                    </tr>
                ))
            }
            <tr>
                <td colSpan="5">
                    <h3>Tổng tiền : </h3>
                    <h3><Price price={order.totalPrice}/></h3>
                </td>
            </tr>
        </tbody>
    </table>
  )
}
