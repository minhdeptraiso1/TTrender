import React, { useState, useEffect } from 'react'
import classes from './payment.module.css'
import { getNewOrderForCurrentUser, payOrder } from '../../services/orderService';
import Title from '../../components/Title/Title';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import Map from '../../components/Map/Map';
import Loading from '../../components/Loading/Loading';
import ButtonPayment from '../../components/ButtonPayment/ButtonPayment';

export default function Payment() {
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const handlePlaceOrder = async () => {
        if (!order) {
            alert('Không tìm thấy thông tin đơn hàng');
            return;
        }
        
        setIsPlacingOrder(true);
        try {
            // Sử dụng hàm payOrder từ orderService
            const result = await payOrder();
            
            if (result) {
                alert('Đặt hàng thành công!');
                // Có thể chuyển hướng đến trang thành công
                // window.location.href = '/orders/success';
            } else {
                alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
            }
        } catch (err) {
            console.error('Lỗi khi đặt hàng:', err);
            alert('Có lỗi xảy ra khi gửi đơn hàng.');
        } finally {
            setIsPlacingOrder(false);
        }
    };

    useEffect(() => {
        getNewOrderForCurrentUser()
            .then(data => {
                setOrder(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Lỗi khi lấy thông tin đơn hàng:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <Loading />;
    if (!order) return <div>Không tìm thấy đơn hàng</div>;
    
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Title title="Thanh toán" fontSize="1.6rem" />
                <div className={classes.summary}>
                    <div>
                        <h3>Tên:</h3>
                        <span>{order.name}</span>
                    </div>
                    <div>
                        <h3>Địa chỉ:</h3>
                        <span>{order.address}</span>
                    </div>
                    <div>
                        <h3>Giá trị đơn hàng:</h3>
                        <span>{order.totalPrice?.toLocaleString('vi-VN')} VND</span>
                    </div>
                </div>
                <div className={classes.payment_methods}>
                    <div>
                        <h3>Phương thức thanh toán:</h3>
                        <span>Thanh toán khi nhận hàng</span>
                    </div>
                </div>
                <OrderItemsList order={order} />
            </div>
            <div className={classes.map}>
                <Title title="Vị trí của bạn" fontSize="1.6rem" />
                <Map readonly={true} location={order.addressLatLng} />
                
                <div className={classes.buttons_container}>
                    <div className={classes.buttons}>
                        <ButtonPayment
                            text={isPlacingOrder ? "Đang xử lý..." : "Đặt hàng"}
                            color="white"
                            backgroundColor="#e7292e"
                            fontSize="1.5rem"
                            width="100%"
                            height="50px"
                            onClick={handlePlaceOrder}
                            disabled={isPlacingOrder}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}