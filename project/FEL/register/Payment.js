import { View, Text, Pressable } from "react-native";
import { globalStyle } from "../../../style/global";
function Payment( {navigation}){
    return(
        //To do NOT DONE
        <View style = {globalStyle.container}>
            <Text>This is the payment page</Text>
            <Pressable onPress={ () => {navigation.navigate('Home' /* à changer plus tard pour la page de login*/)}} >
                <Text>Ignore</Text>
            </Pressable>
        </View>
    );
}

export default Payment