import { StyleSheet } from "react-native";

export const scrollView = StyleSheet.create({
    scrollViewCatalog: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewCart:{
      alignSelf:'center'
    },
    box: {
      flexDirection: 'row',
      borderWidth: 1,
    },
    leftSide: {
      flex: 1,
      borderRightWidth: .1
    },
    rightSide: {
      flex: 2,
      padding: 10,
    },
    image: {
       flex: 1,
      height: null,
      width: null
    },
    text: {
      fontSize: 16,
      marginVertical: 5,
    },
    fullWidth: {
      flex: 1,
    },
    addToCart:{
      marginTop: 5,
        width: 100,
        height: 25,
        backgroundColor: '#fac92f',
        alignItems: 'center',
        borderRadius: 15,
        justifyContent: 'center',
        borderWidth: .1,
    },
    quantity:{
      flexDirection: 'row',
    },
    minusPlusPressable:{
      marginLeft:5,
      marginRight:5,
      backgroundColor: 'lightgray',
      height: 20,
      width:30,
      borderRadius: 3,
      alignItems:'center',
      alignSelf:"center",
      borderWidth:.3
    },
    icons:{
      marginRight: 5,
      marginLeft:5,
      marginTop:1
    },
})