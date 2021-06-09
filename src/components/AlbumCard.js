import React from 'react';


const AlbumCard = ({ albumName }) => {
    console.log("albumName:",albumName);
    const imgSrc = "https://icons.iconarchive.com/icons/paomedia/small-n-flat/96/folder-icon.png";

    return ( 
        <div style={{textAlign:"center"}} className="albumCard">
        <img  alt="folder" src={imgSrc} />
          <h4  style={{marginTop:"0.2rem"}}>{albumName}</h4>          
      </div>
        );
}
 
export default AlbumCard;