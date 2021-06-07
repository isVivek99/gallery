import Navbar from './components/NavBar';
import AlbumList from './components/AlbumList';
import GalleryPage from './components/GalleryPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
    return ( 
        <div>
            <Router>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={AlbumList} />
                <Route path={`/albums/:albumId`} component={GalleryPage} />
            </Switch>
            </Router>
        </div>
     );
}
 
export default App;