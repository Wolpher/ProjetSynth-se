import Register from './project/FEL/register/Register';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{useState} from 'react'
import RegisterOrLogin from './project/FEL/RegisterOrLogin';
import Payment from './project/FEL/register/Payment';
import Catalog from './project/FEL/Items/catalog';
import Login from './project/FEL/login/login';
import Cart from './project/FEL/Items/cart';
import { CartProvider } from './project/BLL/CartContext';
import { CustomHeaderTitle } from './project/FEL/CustomHeaderTile';


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
//Go to the payment screen (NOT DONE MAY CHANGE)
function PaymentScreen({navigation}){
  return(
    <Payment navigation={navigation}/>
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
function CartScreen(){
  return(
    <Cart/> 
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false)

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
        <Stack.Screen name="Payment" component={PaymentScreen} options={{
          title:'Payment information'
        }}/>
        <Stack.Screen name="Catalog" component={CatalogScreen} options={{
          title: "Catalog",
          headerRight: () => (<CustomHeaderTitle updateIsLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />)
        }}/>
        <Stack.Screen name="Cart" component={CartScreen} options={{
          headerRight: () => (<CustomHeaderTitle updateIsLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}/>)
        }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{title:'Login'}} initialParams={{updateIsLoggedIn: setisLoggedIn}} />
        
      </Stack.Navigator>
    </NavigationContainer>
      </CartProvider>
      
    
    
  );
}
