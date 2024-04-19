import Icon from "react-native-vector-icons/FontAwesome"
import {useNavigation, useRoute} from '@react-navigation/native'
import React, {useState} from 'react'
import { Pressable,Text, View, TouchableOpacity, Modal } from 'react-native';
import { modalstyle } from "../../style/modal";
import { handleLogout } from "../BLL/User";

const CustomHeaderTitle = ({updateIsLoggedIn, setisLoggedIn}) => {
    const route = useRoute()
    const navigation = useNavigation();
  
    const [isModalVisible, setisModalVisible] = useState(false)
    const {user} = route.params || {}
    
    return (
      <View style={{ flexDirection: 'row', paddingRight: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-cart" size={30} color="black" />
        </TouchableOpacity>
        {updateIsLoggedIn ? (
          <View>
            <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          >
          <View style={modalstyle.centeredView}>
            <View style={modalstyle.modalView}>
              <Text style= {modalstyle.titleText}>account:</Text>
              <Text style={modalstyle.emailText}>Email: {user}</Text>
              <View style={{flexDirection: 'row'}}>
              <Pressable style={[modalstyle.button, modalstyle.buttonCancel]} onPress={() => setisModalVisible(!isModalVisible)}>
                <Text style ={[modalstyle.buttonText, modalstyle.textCancel]}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[modalstyle.button, modalstyle.buttonLogout]}
                onPress={() => {
                  handleLogout(), setisModalVisible(!isModalVisible), setisLoggedIn(false)
                }}>
                <Text style={[modalstyle.buttonText, modalstyle.textLogout]}>Logout</Text>
              </Pressable>
              </View>
              
            </View>
          </View>
        </Modal>
            <TouchableOpacity onPress={() =>{setisModalVisible(true)}} style={{ paddingLeft: 10 }}>
            <Icon name="user-times" size={30}/>
            </TouchableOpacity>
          </View>
        
        ): (
          
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ paddingLeft: 10 }}>
        <Icon name="user" size={30}/>
      </TouchableOpacity>
        )}
      </View>
    );
  };

  export {CustomHeaderTitle}