import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../Styles/ImageList.css';

const ImageList = () => {

    const location = useLocation();
    const images = location.state?.images;

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <Button aria-label="Go back" onClick={() => { handleGoBack() }}>
                Back
            </Button>
            <h2>Search Results:</h2>
            <ul>
                {images.map((imageData, index) => (
                    <img
                        key={index}
                        src={`data:image/jpeg;base64,${imageData}`}
                        alt={`Image ${index}`}
                        className="image-item" />
                ))}
            </ul>
        </div>
    );
}

export default ImageList;