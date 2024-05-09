import { View, Text, ScrollView, Dimensions, Image} from "react-native";
import React, { useContext } from 'react';
import CartContext from "../../BLL/CartContext";
import Icon  from "react-native-vector-icons/FontAwesome";
import { cartStyle } from "../../../style/items/cart";
import ButtonAnimation from "../../BLL/ButtonAnimation";
import { globalStyle } from "../../../style/global";
import { scrollView } from "../../../style/scrollview/scrollview";

const {width} = Dimensions.get('window');

function Cart({navigation}) {
    const { cartItems,subTotal , increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const cartEmpty = cartItems.length === 0
    return (
        <View style={ globalStyle.container}>
            { 
                !cartEmpty &&(
                    <ScrollView contentContainerStyle= {scrollView.scrollViewCart}>
             
            { 
                cartItems.map((item, index) => {
                    return(
                        <View key={index} style={[scrollView.box, {width: width*0.9}]}>

                            <View style={scrollView.leftSide}>
                            <Image source={{uri: item.item.Image}} style={[scrollView.image,scrollView.fullWidth]} resizeMode="cover"/>
                            </View>

                            <View style={scrollView.rightSide}>
                                <Text style={scrollView.text}>{item.item.Name}</Text>
                                <Text style={scrollView.text}>$ {item.item.Price} </Text>
                                <View style = {scrollView.quantity}>
                                    <ButtonAnimation style = {scrollView.minusPlusPressable} onPress={() => decreaseQuantity(index)}>
                                        <Icon style = {scrollView.icons} name="minus" size={15} color="black" />
                                    </ButtonAnimation>
                                    <Text style={scrollView.text}> {item.Quantity} </Text>
                                    <ButtonAnimation style = {scrollView.minusPlusPressable} onPress={() => increaseQuantity(index)}>
                                        <Icon style = {scrollView.icons} name="plus" size={15} color="black"/>
                                    </ButtonAnimation>
                                </View>
                            </View>
                            
                        </View>

                    )
                })
            }
            <Text>Your total is: {subTotal}</Text>
                        <ButtonAnimation style={cartStyle.checkoutButton} onPress={() => navigation.navigate('Paypal')}>
                            <Text style={cartStyle.checkoutText}>Proceed to checkout</Text>
                        </ButtonAnimation>
                    </ScrollView>
                )
            }
            {
                cartEmpty && (
                    <View style={ globalStyle.container} >
                        <Text style={cartStyle.emptyCartText}>Your cart is empty</Text>
                    </View>
                )
                
            }
            
        </View>
    );
}

export default Cart;
