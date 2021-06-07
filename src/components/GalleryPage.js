import React,{useEffect, useState,} from 'react';
import {useParams} from 'react-router-dom';
import { projectStorage } from '../firebase/firebaseConfig';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './Gallerypage.css';


const GalleryPage = () => {

    const {albumId} = useParams();
    const [file, setFile] = useState(null)
    const [error, setError] = useState("");

    const fileType=["image/png", "image/jpg", "image/jpeg"];

    const fileUploadHandler = (e) => {
        //console.log(e.target.files[0].type);
        if(e.target.files[0].type !== fileType[0] && 
            e.target.files[0].type !== fileType[1] &&
                e.target.files[0].type !== fileType[2]){
                setError("uplaod jpg/png/jpeg");
                setFile(null);
        }else{
                setError("");
                setFile(e.target.files[0]);
            }
    }

    return ( 
        <div className="gallerypage">
            <div className="uploadimage" >
            <label className="label">
                <input className="input" type="file" onChange={fileUploadHandler}/>
                <span><CloudUploadIcon/></span>
            </label>
            {error && <div style={{color:"red", textAlign:"center"}}>{error}</div>}
            </div>
            {albumId}
        </div>
     );
}
 
export default GalleryPage;