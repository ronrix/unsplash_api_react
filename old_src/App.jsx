import React from "react";

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import Unsplash from './api/unsplash'; 
import Search from './components/Search'; 

function App() {

    const [loading, setLoading] = React.useState(true);
    const [images, setImages] = React.useState([1, 2, 3, 4, 5, 6, 7]);
    const [text, setText] = React.useState("random");

    const getImagesDefault = async () => {
        const {data} = await Unsplash.get("/photos");

        setLoading(false);
        setImages(data);
    }

    const setNewImagesFromSearch = (data) => {
        setImages(data);
    }
 
    React.useEffect(() => {
        getImagesDefault();
    }, []);
    return (
        <div>
            <Search setNewImagesFromSearch={setNewImagesFromSearch} setLoading={setLoading} setText={setText} />

            <h4 className="ui header" style={{marginLeft: "1em", textTransform: "uppercase"}}>{text}</h4>
            <div style={{display: "flex", flexDirection: "column", flexWrap: "wrap", margin: "1em", height: "1200px"}}>
            {loading ? (
                <div class="ui active centered inline large loader"></div>
            ) : images.length ? images.map(image => {
                return (
                    <img 
                        key={image.id} 
                        src={image?.urls?.regular || image.preview_photos[0].urls.regular} 
                        alt={image.id} 
                        className="column"
                        style={{width: "300px", verticalAlign: "middle", marginTop: "0.5em"}} 
                    />
                );
            }) : <h6 className="ui center aligned header">No Results!</h6>}
            </div>
        </div>
    );
}

export default App;
