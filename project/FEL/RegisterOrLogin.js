import {Pressable,Text, View } from "react-native";
import { globalStyle } from "../../style/global";
import { registerOrLoginStyle } from "../../style/register_login/registerOrLogin";

export default function RegisterOrLogin( {navigation}){
    return(
        <View  style = { globalStyle.container}>
        <Pressable onPress={() => navigation.navigate('Register') } style={[ globalStyle.pressable, registerOrLoginStyle.yellowBackground, registerOrLoginStyle.registerOrLoginPressable]}>
          <Text>Register an account</Text>
        </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')} style = {[globalStyle.pressable, registerOrLoginStyle.blueBackground, registerOrLoginStyle.registerOrLoginPressable]}>
        <Text>Login into your account</Text>
      </Pressable>
    </View>
    )
}