import firebase from 'firebase/compat/app';
import {set,ref,getDatabase} from'firebase/database';

// Configuration Firebase (à obtenir depuis la console Firebase)
const firebaseConfig = {
  apiKey: 'AIzaSyCB-EI_R2WTWaSlEo7lU2ikefKJPYr0sCA',
  authDomain: 'assezbanale.firebaseapp.com',
  databaseURL: "https://assezbanale-default-rtdb.firebaseio.com",
  projectId: 'assezbanale',
  storageBucket: 'assezbanale.appspot.com',
  messagingSenderId: '973937000833',
  appId: '1:973937000833:web:a2eb0904ef6f78c14a6880',
  measurementId: "G-SXFMVSL289"
};

// Initialiser Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


// Référence à la base de données Firebase
const database = getDatabase();

const createUser = async (email, password, additionData) => {
  try{
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
  const user = userCredential.user;

  await set(ref( database, `users/${user.uid}`), additionData)

  return user;
  }catch(error){
    throw error;
  }
  
}

export {database, createUser}