import React, { useState } from 'react';

export default function CODButton({ order }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCODPayment = async () => {
    if (!order) {
      alert('Không tìm thấy đơn hàng');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Chỉ gọi API để thêm pay = "cod" vào đơn hàng
      const res = await fetch('/api/orders/ship', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        }
        // Không cần body vì chỉ cập nhật đơn hàng hiện tại
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        alert('Đã chọn thanh toán COD thành công!');
        // Có thể reload trang hoặc cập nhật state
        window.location.reload();
      } else {
        alert('Lỗi: ' + (data.message || 'Không thể cập nhật'));
      }

    } catch (err) {
      console.error('Lỗi:', err);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button 
      onClick={handleCODPayment}
      disabled={isProcessing}
      style={{
        padding: '10px 20px',
        backgroundColor: isProcessing ? '#ccc' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: isProcessing ? 'not-allowed' : 'pointer'
      }}
    >
      {isProcessing ? 'Đang xử lý...' : 'Chọn thanh toán COD'}
    </button>
  );
}