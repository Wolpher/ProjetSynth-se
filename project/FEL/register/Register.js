import React, {useState} from "react"
import { Alert, Text, TextInput, View } from "react-native"
import { createUser } from "../../DAL/server"
import { globalStyle } from "../../../style/global"
import ButtonAnimation from "../../BLL/ButtonAnimation"
import { registerOrLoginStyle } from "../../../style/register_login/registerOrLogin"

function Register({ navigation }) {
    //Changer pour le mettre dans un autre fichier
    const [Name, setNom] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const handleRegistration = async () => {
        try{
            const user = await createUser(Email, Password, {Name});
            console.log("New user created:", user.uid)
            navigation.navigate('Payment');
        }catch (error){
            console.error("Error create user:", error);
            Alert.alert("Error", "Faile to create user. Please try again")
        }
    }

    return (
        <View style={globalStyle.container}>
            <Text>Entrez votre nom:</Text>
            <TextInput
                placeholder="Name"
                style={registerOrLoginStyle.registerlogin}
                onChangeText={(text) => setNom(text)}
            />
            <Text>Entrez votre email: </Text>
            <TextInput
                placeholder="Email"
                style={registerOrLoginStyle.registerlogin}
                onChangeText={(text) => setEmail(text)}
            />
            <Text>Entrez un mot de passe</Text>
            <TextInput
                placeholder="Password"
                style={registerOrLoginStyle.registerlogin}
                onChangeText={(text) => setPassword(text)}
            />
            <ButtonAnimation onPress={handleRegistration} style={[registerOrLoginStyle.registerlogin, registerOrLoginStyle.yellowBackground, globalStyle.pressable]}>
                <Text>Continue</Text>
            </ButtonAnimation>
        </View>
    )
}

export default Register
