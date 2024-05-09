import firebase from "firebase/compat/app";


class Authentification {
    isConnected = false
    user = null
    async checkAuth() {
        return new Promise((resolve, reject) => {
            //check if a user is connected in the database
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.isConnected = true;
                    this.setUser(user);
                    resolve(this.isConnected);
                } else {
                    this.isConnected = false;
                    resolve(this.isConnected);
                }
            });
        });
    }
    

    async setUser(user){
        this.user = user;
    }
    async getUser() {
        if (!this.user) {
            await this.checkAuth();
        }
        return this.user;
    }
}

export default Authentification;
