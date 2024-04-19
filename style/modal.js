import { StyleSheet } from "react-native"


export const modalstyle = StyleSheet.create({
    //For the modal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    //For the button
    button:{
        borderRadius:20,
        padding:5,
        elevation:3,
        marginRight:15,
        marginLeft:15
    },
    buttonLogout:{
        backgroundColor:'#fac92f'
    },
    buttonCancel:{
        backgroundColor:'#2196F3'
    },
    //For the text in the button
    buttonText:{    
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textLogout:{
        color:'#2196F3'
    },
    textCancel:{
        color:'#fac92f'
    },

    titleText:{
        position:'absolute',
        top:0,
        left:0,
        paddingLeft:5,
        paddingTop:5,
        fontWeight:'bold'
    },
    emailText:{ 
    marginBottom: 15,
    textAlign: 'center'
    }

})