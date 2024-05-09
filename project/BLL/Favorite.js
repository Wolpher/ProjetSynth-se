import { Alert } from "react-native"
import Authentification from "../DAL/user"
import firebase from "firebase/compat/app"
const addFavorite =async (item) => {
    const auth = new Authentification()

    let isConnected =await auth.checkAuth()
    const user = auth.getUser()
    if (isConnected == true){
        try{
            const itemId = item.item.id
            console.log(user)
            //refenre to the item in the favorite in the databse
            const database = firebase.database().ref(`users/${user._j.uid}/favorite/${itemId}`)
            database.set({
                    Image: item.item.Image,
                    Name: item.item.Name,
                    Price: item.item.Price,
            })
        }catch(error){
            console.error(error)
        }
    } else  {
        Alert.alert("You are currently not connected to an account")
    }
    
}

const deleteFavorite = async (item) => {
    const auth = new Authentification()
    let user = await auth.getUser()
    const itemId = item.item.id
    console.log("user de merde", user)
    const favorite = firebase.database().ref(`users/${user.uid}/favorite/${itemId}`)
    favorite.remove()
        .then(() => {
            console.log('Remove with success')
        })
        .catch((error) =>{
            console.error(error)
        })
}

export {addFavorite, deleteFavorite}