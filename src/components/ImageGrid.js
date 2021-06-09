import React,{useState, useEffect,} from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import './ImageGrid.css';

const ImageGrid = ({ setImage }) => {

    const {albumId} = useParams();
    const [albumArray, setAlbumArray] = useState([]);


     useEffect( ()=>{
        db.collection("albums")
      .doc(albumId)
      .onSnapshot((snapshot) => {
        console.log(snapshot.data());
        setAlbumArray(snapshot.data().images)
      })
  }, [albumId])
    
    console.log(albumArray);
    const sortedArray = albumArray.sort(function(a,b){
        return a.index - b.index;
    })
    console.log(sortedArray);

    

    return ( 
        <div className="img-grid">
            {sortedArray && sortedArray.map(doc => (
                <div key={doc.createdAt} className="img-wrap" onClick={()=>setImage(doc)} >
                    <img src={doc.url} alt={doc.name}/>
                </div>
            ))}
        </div>
     );
}
 
export default ImageGrid;