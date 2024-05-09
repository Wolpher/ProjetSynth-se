import Register from './project/FEL/register/Register';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import RegisterOrLogin from './project/FEL/RegisterOrLogin';
import Catalog from './project/FEL/Items/catalog';
import Login from './project/FEL/login/login';
import Cart from './project/FEL/Items/cart';
import Favorite from './project/FEL/Items/favorite';
import { CartProvider } from './project/BLL/CartContext';
import { CustomHeaderTitle } from './project/FEL/CustomHeaderTile';
import Paypal from './project/BLL/Payments/Paypal';


//Go to the RegisterOrLogin screen
function RegisterOrLoginScreen({navigation}){
  return(
    <RegisterOrLogin navigation={navigation}/>
  )
}
//Go to the Register screen
function RegisterScreen({navigation}){
  return(
    <Register navigation={navigation}/>
  )
}
//Go to the catalog Screen
function CatalogScreen({navigation}){
  return(
    <Catalog navigation= {navigation}/>
  )
}
//Go to the login screen
function LoginScreen({navigation}){
  return(
    <Login navigation={navigation}/>
  )
}
//Go to the cart screen
function CartScreen({navigation}){
  return(
    <Cart navigation={navigation}/> 
  )
}
//Go to favorite screen
function FavoriteScreen(){
  return(
    <Favorite/>
  )
}
//go to the paypal screen
function PaypalScreen(){
  return <Paypal/>
}
const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <CartProvider>
        <NavigationContainer>
      <Stack.Navigator initialRouteName='Catalog'>
        <Stack.Screen name="Home" component={RegisterOrLoginScreen} options={{
          title:""
        }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{
           title:'Register your account' 
        }}/>
        <Stack.Screen name="Catalog" component={CatalogScreen} options={{
          title: "Catalog",
          headerRight: () => (<CustomHeaderTitle />)
        }}/>
        <Stack.Screen name="Cart" component={CartScreen} options={{
          headerRight: () => (<CustomHeaderTitle />)
        }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{title:'Login'}} />
        <Stack.Screen name="Favorites" component={FavoriteScreen}/>
        <Stack.Screen name="Paypal" component={PaypalScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
      </CartProvider>
      
    
    
  );
}
