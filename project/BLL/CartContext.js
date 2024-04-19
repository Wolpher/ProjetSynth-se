import React, {createContext, useState} from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    const addItem = (product) => {
    let updatedCartItems = [...cartItems];
    let found = false;
    found = updatedCartItems.some(item => {
        return item.item.id === product.item.id});
    if (found) {
        updatedCartItems = updatedCartItems.map(item => {
            if (item.item.id === product.item.id) {
                item.Quantity += 1;
            }
            return item;
        });
    } else {
        product.Quantity = 1;
        updatedCartItems.push(product);
    }
    setCartItems(updatedCartItems);
    }

    const increaseQuantity = (index) =>{
        const updatedCartItems = [...cartItems]
        updatedCartItems[index].Quantity +=1;
        setCartItems(updatedCartItems)
    }

    const decreaseQuantity = (index) =>{
        const updatedCartItems = [...cartItems]
        if(updatedCartItems[index].Quantity == 1){
            const filteredItem = updatedCartItems.filter((item, idx) => idx != index)
            setCartItems(filteredItem)
        }else{
            updatedCartItems[index].Quantity -= 1
            setCartItems(updatedCartItems)
        }

    }
    return(
        <CartContext.Provider value={{cartItems, addItem, increaseQuantity, decreaseQuantity}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;