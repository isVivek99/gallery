import React,{useEffect, useState,} from 'react';
import {useParams} from 'react-router-dom';
import { projectStorage, db } from '../firebase/firebaseConfig';
import { useStorage } from '../hooks/useStorage';
import firebase from "firebase";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { CircularProgress } from '@material-ui/core';
import './UploadForm.css';



const UploadForm = () => {
    const {albumId} = useParams();
    const [error, setError] = useState("");
    const fileType=["image/png", "image/jpg", "image/jpeg"];

    const [url, setUrl] = useState("")
    const [uploaderror, setUploadError] = useState("")
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false);
    const [upload, setupload] = useState(false)

    useEffect(()=>{
        if(url){
            console.log("setloading false");
            setLoading(false);
            setupload(false);
        }
    },[url])
        

    const fileUploadHandler = async (e) => {

        const selected = e.target.files[0];
        console.log(selected);

        if(selected.type === fileType[0] || 
            selected.type === fileType[1] ||
                selected.type === fileType[2]){
                    console.log("setfile");
                    await setError("");     
        }else{
            setError("upload jpg/png/jpeg");
                console.log("ettot");
                return;
            }


        const storageRef = projectStorage.ref(selected.name);
        const collectionRef = db.collection("albums");

        
            storageRef.put(selected).on("state_changed",async (snap)=>{
                let perc = (snap.bytesTransferred/snap.totalBytes)*100;
                console.log("perc:",perc);
                await setProgress(perc);
                await setLoading(true);
            }, async (err)=>{
               await setUploadError(error);
            }, async ()=>{
                var imageObj=null;
                const url = await storageRef.getDownloadURL();
                setUrl(url);
                const doc = await collectionRef.doc(albumId).get();
                imageObj = doc.data();
                console.log("imageObj:",...imageObj.images);
                const indexObj = await db.collection("albums").doc("indexOfImage").get();
                const index = indexObj.data().index;
                await db.collection("albums").doc("indexOfImage").update({index:firebase.firestore.FieldValue.increment(1)})
                const timeStamp = firebase.firestore.Timestamp.now()
                const imageName = selected.name;
                const addObj = {url, createdAt:timeStamp, index:index, name:imageName }
                collectionRef.doc(albumId).update(
                        {
                            ...imageObj,
                            images: [ ...imageObj.images, addObj] 
                        }
                    )     
                console.log(imageObj);
               
            })   
        
    
    }
   
 

    return ( 
        <div>
             <div className="uploadimage" >
            <label className="label">
                <input className="input" type="file" onChange={fileUploadHandler}/>
                <span><CloudUploadIcon /></span>
            </label>
            <div className="loading" >
            {loading && <CircularProgress style={{color: "#0c709b" }} size={60} variant={"determinate"} value={progress} />} 
            </div>
             
            {error && <div style={{color:"red", textAlign:"center", marginTop:"4rem"}}>{error}</div>}
            </div>
            {albumId}
        </div>
     );
}
 
export default UploadForm;