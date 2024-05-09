import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import React, {useState, useEffect, useContext} from 'react'
import { database } from "../../DAL/server";
import { ref,onValue } from "firebase/database";
import CartContext from "../../BLL/CartContext";
import ButtonAnimation from "../../BLL/ButtonAnimation";
import { catalogStyle } from "../../../style/items/catalog";
import { scrollView } from "../../../style/scrollview/scrollview";
import Icon from "react-native-vector-icons/FontAwesome"
import {addFavorite} from "../../BLL/Favorite";

const {width} = Dimensions.get('window');

function Catalog(){

    const [product, setProduct] = useState([])
    const {addItem} = useContext(CartContext)

    useEffect (() => {
        //Reference au products dans la db
        const starCountRef = ref(database, 'Products/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const newPosts = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }))
            //add all the products of the database into the variable product
            setProduct(newPosts)
        })
    }, [])
    return(
        <ScrollView contentContainerStyle= {scrollView.scrollViewCatalog}>
             
            {
                product.map((item, index) => {
                    return(
                        <View key={index} style={[scrollView.box, {width: width*0.9}]}>

                            <View style={scrollView.leftSide}>
                            <Image source={{uri: item.Image}} style={[scrollView.image,scrollView.fullWidth]} resizeMode="cover"/>
                            </View>

                            <View style={scrollView.rightSide}>
                                <Text style={scrollView.text}>{item.Name}</Text>
                                <Text style={scrollView.text}>$ {item.Price} </Text>
                                <View style={{flexDirection:'row'}}>
                                    <ButtonAnimation style={catalogStyle.addToCart} onPress={() => addItem({ item })} >
                                        <Text>Add To Cart</Text>
                                    </ButtonAnimation>
                                    <ButtonAnimation onPress={() => addFavorite({item})}>
                                        <Icon name="star-o" size={25} style={{marginTop:5, marginLeft:5}}/>
                                    </ButtonAnimation>
                                </View>
                                
                            </View>
                            
                        </View>

                    )
                })
            }
        </ScrollView>
    );
}
  

export default Catalog;
