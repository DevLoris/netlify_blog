import config from '../utils/firebase.keys'
const conf = config;

let firebaseInstance;
export const getFirebase = firebase => {
    if (firebaseInstance) {
        return firebaseInstance
    }

    firebase.initializeApp(conf)
    firebaseInstance = firebase

    return firebase
}
