import React from 'react'
import classes from './checkoutPage.module.css'
import {useCart} from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {createOrder} from '../../services/orderService'
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList'
import Title from '../../components/Title/Title'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Map from '../../components/Map/Map'
export default function CheckoutPage() {
    const {cart} = useCart();
    const {user} = useAuth();
    const navigate = useNavigate();
    const [order, setOrder] = useState({...cart});
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [paymentMethod, setPaymentMethod] = useState("COD"); // mặc định là COD

    const onSubmit = async data => {
        if (!order.addressLatLng) {
            toast.warning("Vui lòng chọn địa chỉ");
            return;
        }
    
        const foodIds = cart.items.map(item => item.food.id); // 👈 Lưu ý phải dùng item.food.id
    
        const result = await createOrder({
            foodIds,
            name: data.name,
            address: data.address,
            addressLatLng: order.addressLatLng,
            paymentMethod
        });
    
        if (result) {
            navigate('/OrderTrack');
        } else {
            toast.error("Tạo đơn hàng thất bại");
        }
    };
    
    
    
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
        <div className={classes.content}>
            <Title title="Đặt hàng" fontSize="3rem" margin="1.5rem 0 0 2.5rem"/>
            <div className={classes.inputs}>
                <Input
                    label="Họ và tên"
                    type="text"
                    {...register("name", {
                        required: {value: true, message: "Họ và tên là bắt buộc"},
                        minLength: {value: 3, message: "Họ và tên phải có ít nhất 3 ký tự"},
                        maxLength: {value: 50, message: "Họ và tên phải có nhiều nhất 50 ký tự"},
                    })}
                    placeholder="Họ và tên"
                    error={errors.name}
                />
                <Input
                    label="Địa chỉ"
                    type="text"
                    {...register("address", {
                        required: {value: true, message: "Địa chỉ là bắt buộc"},
                    })}
                    placeholder="Địa chỉ"
                    error={errors.address}
                />
            </div>
            <Title title="Hóa đơn" fontSize="2rem" margin="1rem 0 1rem 0rem" />
            <OrderItemsList order={order}/>
            <div className={classes.map}>
                <Title title="Chọn địa chỉ" fontSize="2rem" />
                <Map 
                    readonly={false} 
                    location={order.addressLatLng} 
                    onChange={latLng => setOrder({ ...order, addressLatLng: latLng })}
                />
            </div>
            <div className={classes.payment}>
    <Title title="Hình thức thanh toán" fontSize="2rem" />
    <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
        <label>
            <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Thanh toán khi nhận hàng (COD)
        </label>
        <label>
            <input
                type="radio"
                name="paymentMethod"
                value="VNPAY"
                checked={paymentMethod === "VNPAY"}
                onChange={(e) => setPaymentMethod(e.target.value)}
            />
            VNPAY
        </label>
    </div>
</div>

            <div className={classes.buttons_container}>
                <div className={classes.buttons}>
                    <Button
                        type="submit"
                        text="Đến phần thanh toán"
                        color="white"
                        backgroundColor="#e7292e"
                        fontSize="1.5rem"
                        width="100%"
                        height="50px"
                    />
                </div>
            </div>
        </div>
    </form>
    </>
  )
}
