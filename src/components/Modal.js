
import './Modal.css';

const Modal = ({image, setImage}) => {

    const onClickHandler = (e) => {
        setImage(null);
    }

    return ( 
        <div className="backdrop" onClick={onClickHandler}>
            <img src={image.url} alt={image.name}/>
        </div>
     );
}
 
export default Modal;