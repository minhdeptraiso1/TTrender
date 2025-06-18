//đánh giá sao ở thân trang chủ
import React from 'react';
import classes from './starRating.module.css';

export default function StarRating({ stars, size = 18 }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    marginRight: `${size / 14}px`,
  };

  function Star({ number }) {
    const halfNumber = number - 0.5;
    return (
      <img 
        className={classes.star} 
        style={starStyle} 
        src={
          stars >= number ? "/star-full.png" :
          stars >= halfNumber ? "/star-half.jpg" :
          "/star-empty.png"
        } 
        alt={`${number} star`} 
      />
    );
  }

  return (
    <div className={classes.rating}>
      {[1, 2, 3, 4, 5].map(number => (
        <Star key={number} number={number} />
      ))}
    </div>
  );
}