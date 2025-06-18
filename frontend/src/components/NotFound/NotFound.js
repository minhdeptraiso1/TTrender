import React from 'react'
import classes from './notFound.module.css'
import { Link } from 'react-router-dom'
export default function NotFound({
    message = "Không tìm thấy món ăn!",
    linkRoute = "/",
    linkText = "Trở về trang chủ"
}) {
    return (
        <div className={classes.container}>
            <h2>{message}</h2>
            <Link to={linkRoute}>{linkText}</Link>
        </div>
    );
}