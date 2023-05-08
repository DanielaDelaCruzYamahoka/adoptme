import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import {getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'
//instalar uuid (npm i uuid) para generar ids unicos a las imagenes
import {v4} from 'uuid'
const config={
    apiKey: "AIzaSyAhgMBcurubxcBvHuHsBkbfBUdmg6TO80o",
    authDomain: "adoptme-e0300.firebaseapp.com",
    databaseURL: "https://adoptme-e0300-default-rtdb.firebaseio.com",
    projectId: "adoptme-e0300",
    storageBucket: "adoptme-e0300.appspot.com",
    messagingSenderId: "258497471559",
    appId: "1:258497471559:web:d188381de73d09e09e3d62",
    measurementId: "G-LGH7CG0234"
}

const fb= !firebase.apps.lenght ? firebase.initializeApp(config):firebase.app()
export default fb;
 export const storage= getStorage(fb)

 export async function uploudFile(file){
    const storageRef= ref(storage, v4())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
 }

export async function deleteFile(file){
    const desertRef= ref(storage, file)
    await deleteObject(desertRef).then(() => {
        // File deleted successfully
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
}