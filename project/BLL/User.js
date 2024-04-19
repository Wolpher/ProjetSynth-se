import firebase from "firebase/compat/app";


const handleLogout = () => {
    firebase.auth().signOut().then(function(){
        console.log('Signed Out')
      }, function(error){
        console.error('sign out error', error)
      })
}    

export {handleLogout}
