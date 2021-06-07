import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {db} from '../firebase/firebaseConfig';
import  AlbumCard from './AlbumCard';
import AddNewAlbum from './AddNewAlbum';
import './AlbumList.css'


const AlbumList = () => {

    const [albumCollection, setAlbumCollection] = useState([])

    useEffect(() => {
        const unsub =  db.collection("albums").orderBy("createdAt", "desc").onSnapshot(snap => {
            let albumArray1 = snap.docs.map(doc => {
                return {
                    ...doc.data(),
                    id:doc.id,
                }
            })
            setAlbumCollection(albumArray1);

        })

        return () => unsub();
    }, [])

    console.log(albumCollection);

    const albumArray2 = albumCollection.map(album => (
        <Link to={`/albums/${album.id}`} key={album.id}>
        <AlbumCard albumName={album.albumName}  />
        </Link>
    ))


    return (
        <div className="albumList__parent">
            <AddNewAlbum/>
            <div className="albumList">
                {albumArray2}
            </div>
        </div>
      );
}
 
export default AlbumList;