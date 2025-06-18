//trang chủ chứa các route
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import FoodPage from './pages/Food/FoodPage'
import CartPage from './pages/Cart/CartPage'
import LoginPage from './pages/Login/loginPage'
import RegisterPage from './pages/Register/RegisterPage'
import CheckoutPage from './pages/Checkout/CheckoutPage'
import AuthRoute from './components/AutheRoute/AuthRoute'
import OrderTrack from './pages/OrderTrack/OrderTrack'
import Payment from './pages/Payment/Payment'
import ProfilePage from './pages/Profile/ProfilePage'
export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:searchTerm" element={<HomePage />} />
        <Route path="/tag/:tagName" element={<HomePage />} />
        <Route path="/food/:foodId" element={<FoodPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<AuthRoute><CheckoutPage /></AuthRoute>} />
        <Route path="/payment" element={<AuthRoute><Payment /></AuthRoute>} />
        <Route path="/order-track/:orderId" element={<AuthRoute><OrderTrack /></AuthRoute>} />
        <Route path="/profile" element={<AuthRoute><ProfilePage /></AuthRoute>} />
    </Routes>
  );
}
