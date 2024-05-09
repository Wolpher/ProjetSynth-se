import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import React, {useState, useEffect} from 'react'
import { database } from "../../DAL/server";
import { ref,onValue } from "firebase/database";
import ButtonAnimation from "../../BLL/ButtonAnimation";
import { catalogStyle } from "../../../style/items/catalog";
import { scrollView } from "../../../style/scrollview/scrollview";
import Authentification from "../../DAL/user";
import { deleteFavorite } from "../../BLL/Favorite";
import { favoriteStyle } from "../../../style/items/favorite";
import { globalStyle } from "../../../style/global";
import { cartStyle } from "../../../style/items/cart";

const {width} = Dimensions.get('window');

const Favorite = () => {
    const [product, setProduct] = useState([])
    const auth = new Authentification()
    const [favoriteLength, setFavoriteLenght] = useState(0)
    const [user, setUser] = useState(auth.getUser())
    useEffect (() => {
        if(user){
            //make a ref to the favorite in the database
        const favorite = ref(database, `users/${user._j.uid}/favorite`);
        onValue(favorite, (snapshot) => {
            const data = snapshot.val();
            if( data == null){
                return;
            }else{
                //receive the data if there is some item in the favorite
                const newPosts = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }))
                setFavoriteLenght(newPosts.length)
                setProduct(newPosts)
            }
            
        })
        }else{
            //No user connected
            console.log("non")
        }
        
    }, [])
    return(
        <View style ={globalStyle.container}>
            {favoriteLength > 0 ?(
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
                                        <ButtonAnimation style={favoriteStyle.remove} onPress = {() => deleteFavorite({item}, setFavoriteLenght(favoriteLength - 1))}>
                                            <Text style={favoriteStyle.removeText}>Delete</Text>
                                        </ButtonAnimation>
                                    </View>
                                    
                                </View>
                                
                            </View>
    
                        )
                    })
                }
            </ScrollView>
            ): (
                <View >
                    <Text style={cartStyle.emptyCartText}>You don't have anything in your favorite</Text>
                </View>
            )}
        </View>
        
    )
}

export default Favorite;