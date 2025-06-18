//giá tiền ở thân trang chủ
import React from 'react';
import PropTypes from 'prop-types';

export default function Price({ price, locale = "vi-VN", currency = "VND" }) {
  // Kiểm tra và đảm bảo currency luôn có giá trị hợp lệ
  const safeCurrency = currency || "VND";
  
  const formatPrice = () => {
    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: safeCurrency
      }).format(price);
    } catch (error) {
      console.error("Lỗi định dạng tiền tệ:", error);
      return price; // Fallback hiển thị giá trị gốc nếu có lỗi
    }
  };

  return <span>{formatPrice()}</span>;
}

Price.propTypes = {
  price: PropTypes.number.isRequired,
  locale: PropTypes.string,
  currency: PropTypes.string
};