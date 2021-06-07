import React,{useState, useEffect} from "react";
import { db, timestamp } from "../firebase/firebaseConfig";
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import './AddNewAlbum.css';

const AddNewAlbum = () => {

    const handleClickOpen = () => {
        const albumName = prompt("enter album name");    
        if(albumName){
           db.collection('albums').add({albumName:albumName.trim(), createdAt:timestamp, images:[]});
        }
    }
   


    return (
         
           
        <div className = "addnewalbum" onClick={handleClickOpen}>
            <button>
            <CreateNewFolderIcon style={{ color:"#2f5d62" }} />
            <h4>Create New Album</h4>
            </button>
    </div>
    );
    
}
 
export default AddNewAlbum;