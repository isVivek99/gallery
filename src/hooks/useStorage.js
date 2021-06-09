import React, {useEffect, useState} from 'react';
import {db, projectStorage, timestamp} from '../firebase/firebaseConfig';
import firebase from "firebase";

const useStorage = (selected, albumId) => {
    
    const [url, setUrl] = useState("")
    const [uploadError, setUploadError] = useState("")
    const [progress, setProgress] = useState(null)
    let storageRef=null;
    if(selected){
        storageRef = projectStorage.ref(selected.name);
    }
    useEffect(()=>{ 
        
        if(selected){
            console.log("selected");
            const collectionRef = db.collection("albums");

        storageRef.put(selected).on("state_changed",async (snap)=>{
            let perc = (snap.bytesTransferred/snap.totalBytes)*100;
            console.log(snap.bytesTransferred*100);
            await setProgress(perc);
            
        }, async (err)=>{
           await setUploadError(err);
        }, async ()=>{
            var imageObj=null;
            const url = await storageRef.getDownloadURL();
            await setUrl(url);
            const doc = await collectionRef.doc(albumId).get()
            //await setFile(null);
            imageObj = doc.data();
            console.log("imageObj:",...imageObj.images);
            const timeStamp = firebase.firestore.Timestamp.now()
            const addObj = {url, createdAt:timeStamp }
            collectionRef.doc(albumId).update(
                    {
                        ...imageObj,
                        images: [ ...imageObj.images, addObj] 
                    }
                )     
            console.log(imageObj);
        })
        }
           
        

    }
    ,[albumId, selected])
    
    return {url, uploadError, progress}
}
 
export  {useStorage};