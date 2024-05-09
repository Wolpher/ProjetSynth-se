import Icon from "react-native-vector-icons/FontAwesome"
import {useNavigation, useRoute} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import { Pressable,Text, View, TouchableOpacity, Modal } from 'react-native';
import { modalstyle } from "../../style/modal";
import { handleLogout } from "../BLL/User";
import Authentification from "../DAL/user";

const CustomHeaderTitle = () => {
    const route = useRoute()
    const navigation = useNavigation();
    const auth = new Authentification()
    const [isModalVisible, setisModalVisible] = useState(false)
    const {user} = route.params || {}
    const [isConnected, setisconnected] = useState()
    
    useEffect(()=>{
      const fetchData = async () => {
        //Check if a user is connected
        const isConnected = await auth.checkAuth();
        setisconnected(isConnected);
    }
      fetchData();
  })

  
    return (
      <View style={{ flexDirection: 'row', paddingRight: 10 }}>
        { isConnected ? (
          
          <View style={{flexDirection: 'row'}}>
            
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Icon name="shopping-cart" size={30} color="black" />
            </TouchableOpacity>
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
                  handleLogout(), setisModalVisible(!isModalVisible)
                }}>
                <Text style={[modalstyle.buttonText, modalstyle.textLogout]}>Logout</Text>
              </Pressable>
              </View>
              
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={{paddingLeft:10}}>
          <Icon name="star" size={30}/>
        </TouchableOpacity>
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