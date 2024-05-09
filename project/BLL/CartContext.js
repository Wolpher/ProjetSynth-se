import React, {createContext, useState} from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0.00)

    const addItem = (product) => {
        let updatedCartItems = [...cartItems];
        let found = false;
        //change the value of found at true if they find a item that is already in the cart
        found = updatedCartItems.some(item => {
            return item.item.id === product.item.id});
        if (found) {
            updatedCartItems = updatedCartItems.map(item => {
                if (item.item.id === product.item.id) {
                    //upgrade the quantity for each product that is already there
                    item.Quantity += 1;
                }
                return item;
            });
        } else {
            product.Quantity = 1;
            updatedCartItems.push(product);
        }

        
        const newTotal = updatedCartItems.reduce((acc, item) => {
            return acc + (item.Quantity * parseFloat(item.item.Price))
        }, 0);

        setSubTotal(newTotal)
        console.log(subTotal)
        setCartItems(updatedCartItems);
    }

    const increaseQuantity = (index) =>{
        console.log(index)
        const updatedCartItems = [...cartItems]
        updatedCartItems[index].Quantity +=1;
        setCartItems(updatedCartItems)
        setSubTotal(subTotal + parseFloat(updatedCartItems[index].item.Price));
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
        setSubTotal(subTotal - parseFloat(updatedCartItems[index].item.Price));

    }
    return(
        <CartContext.Provider value={{cartItems,subTotal, addItem, increaseQuantity, decreaseQuantity}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;