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
    const [images, setImages] = React.useState([]);
    const [text, setText] = React.useState("random");
    const [components, setComponents] = React.useState("");

    const getImagesDefault = async () => {
        const {data} = await Unsplash.get("/photos?per_page=25");

        setLoading(false);
        setImages(data);
    }

    const setNewImagesFromSearch = (data) => {
        setImages(data);
    }

    const imageGrid = (images) => {
        let component = "";
        for(let i=0; i<images.length; i++) {
            component += "<div style='flex: 15%; padding-right: 0.2em;'>";
            for(let j=i; j<i+5; j++) {
                const src = images[j]?.urls?.regular || images[j]?.preview_photos[0]?.urls?.regular;
                const id = images[j]?.id
                component += `
                    <img 
                        src=${src}
                        alt=${id}
                        style="margin: 0.8em; width: 200px"
                    />
                `;
            }
            component += "</div>";
            i+=4;
        }

        return { __html: component };
    }

    React.useEffect(() => {
        getImagesDefault();
        setLoading(false);
    }, []);
    return (
        <div>
            <Search setNewImagesFromSearch={setNewImagesFromSearch} setLoading={setLoading} setText={setText} />

            <h4 className="ui header container" style={{marginLeft: "1em", textTransform: "uppercase"}}>{text}</h4>
            {/*<div style={{display: "flex", flexDirection: "column", flexWrap: "wrap", height: "3000px"}}>*/}
            <div className="ui grid container">
            {loading ? (
                <div className="ui active centered inline loader"></div>
            ) : <div style={{display: "flex", flexWrap: "wrap"}} dangerouslySetInnerHTML={imageGrid(images)} /> }{/*images.length ? images.map(image => {
                return (
                    <img 
                        key={image.id} 
                        src={image?.urls?.regular || image.preview_photos[0].urls.regular} 
                        alt={image.id} 
                        className="middle aligned"
                        style={{width: "300px", margin: "0.5em"}} 
                    />
                );
            }) : <h6 className="ui center aligned header">No Results!</h6>} */}
            </div>
        </div>
    );
}

export default App;
