import { View, Text, TextInput, Pressable, Alert } from "react-native"
import React, { useState } from "react"
import firebase from "firebase/compat"
import { registerOrLoginStyle } from "../../../style/register_login/registerOrLogin"
import { globalStyle } from "../../../style/global"

function Login({navigation}){
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const handleEmailChange = (text) =>{
        setEmail(text)
    }

    const handlePasswordChange = (text) =>{
        setPassword(text)
    }

    const handleLogin = () => {
        //Check if the user is in the database and if he his he get is login
        firebase.auth().signInWithEmailAndPassword(Email, Password)
            .then((userCredential) =>{
                const user = userCredential.user;
                //navigate to the catalog page
                navigation.navigate('Catalog', {user:user.email});
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Erreur', 'Adresse e-mail ou mot de passe incorrect.');
            });
    }
    
    return(
        <View style={globalStyle.container}>
            <TextInput
            placeholder="Enter your email"
            onChangeText={handleEmailChange}
            value={Email}
            style={registerOrLoginStyle.registerlogin}
            />
            <TextInput
            placeholder="Enter your password"
            onChangeText={handlePasswordChange}
            value={Password}
            style={[registerOrLoginStyle.registerlogin]}
            />
            <Pressable style={[registerOrLoginStyle.blueBackground,registerOrLoginStyle.registerOrLoginPressable, globalStyle.pressable]} onPress={handleLogin}>
                <Text>Connection</Text>
            </Pressable>
        </View>
    )
}

export default Login