import React,{useEffect, useState,} from 'react';
import {useParams} from 'react-router-dom';
import { projectStorage } from '../firebase/firebaseConfig';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import UploadForm from './UploadForm';
import ImageGrid from "./ImageGrid";
import Modal from "./Modal";
import './Gallerypage.css';


const GalleryPage = () => {

    const[image, setImage] = useState(null);

    return ( 
        <div className="gallerypage">
            <UploadForm/>
            <ImageGrid  setImage={setImage}/>
            { image && <Modal image={image} setImage={setImage}/>}
           
        </div>
     );
}
 
export default GalleryPage;