//header trang chủ
import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
export default function Header() {
  const {user, logout} = useAuth();
  const {cart} = useCart();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
        PIZZA Ngon
        </Link>

        <nav>
            <ul>
                {
                    user ? 
                        <li className={styles.menu_container}>
                        <Link to="/profile">{user.name}</Link>
                        <div className={styles.menu}>
                            <Link to="/profile">Hồ sơ</Link>
                            <Link to="/orders">Đơn hàng</Link>
                            <a onClick={logout}>Đăng xuất</a>
                            
                        </div>
                        </li>
                    : 
                        <li>
                            <Link to="/login">Đăng nhập</Link>
                        </li>
                }
                <li>
                    <Link to="/cart">
                    Giỏ hàng 
                    ({cart.totalCount > 0 && <span className={styles.cart_count}>{cart.totalCount}</span>})
                    </Link>
                </li>
            </ul>
        </nav>
      </div>
    </header>
  )
}
