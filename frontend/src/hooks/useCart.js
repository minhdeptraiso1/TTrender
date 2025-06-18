import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
    items: [],
    totalPrice: 0,
    totalCount: 0
};

export default function CartProvider({children}) {
    const initCart = getCartFromLocalStorage();
    const [cartItems, setCartItems] = useState(initCart.items);
    const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
    const [totalCount, setTotalCount] = useState(initCart.totalCount);

    useEffect(() => {
        const newTotalPrice = cartItems.reduce((total, item) => total + item.price, 0);
        const newTotalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setTotalPrice(newTotalPrice);
        setTotalCount(newTotalCount);
        localStorage.setItem(CART_KEY, JSON.stringify({
            items: cartItems, 
            totalPrice: newTotalPrice, 
            totalCount: newTotalCount
        }));
    }, [cartItems]);

    function getCartFromLocalStorage(){
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : EMPTY_CART;
    }

    const removeFood = (foodId) => {
        setCartItems(cartItems.filter(item => item.food.id !== foodId));
    }

    const addFood = (food) => {
        const existingItem = cartItems.find(item => item.food.id === food.id);
        if(existingItem){
            changeQuantity(existingItem, existingItem.quantity + 1);
        }else{
            setCartItems([...cartItems, {
                food: food,
                quantity: 1,
                price: food.price
            }]);
        }
    }

    const changeQuantity = (cartItem, newQuantity) => {
        const { food } = cartItem;
        const changedCartItem = {
            ...cartItem,
            quantity: newQuantity,
            price: food.price * newQuantity
        };
        setCartItems(cartItems.map(item => 
            item.food.id === cartItem.food.id ? changedCartItem : item
        ));
    }
    const clearCart = () => {
        localStorage.removeItem(CART_KEY);
        setTotalPrice(0);
        setTotalCount(0);
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{
            cart: {items: cartItems, totalPrice, totalCount}, 
            removeFood, 
            addFood, 
            changeQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);