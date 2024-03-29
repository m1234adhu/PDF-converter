import React, { useState } from 'react';
import './App.css';
import jsPDF from 'jspdf';

const App = () => {
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const files = event.target.files;
        const newImages = [...images];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = () => {
                newImages.push({
                    data: reader.result,
                    name: file.name,
                });
                setImages(newImages);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        const newImages = [...images];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = () => {
                newImages.push({
                    data: reader.result,
                    name: file.name,
                });
                setImages(newImages);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDelete = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        images.forEach((image, index) => {
            if (index > 0) {
                doc.addPage();
            }
            doc.text(image.name, 10, 10);
            doc.addImage(image.data, 'JPEG', 10, 20, 180, 160);
        });
        doc.save('converted_images.pdf');
    };

    return (
        <div className="app">
            <div className="nav">

                <div className="logo">
                     PDF Converter
                </div>
                <label htmlFor="image-upload" 
                       className="upload-btn">
                    Upload Images
                </label>
                <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                />
            </div>
            <div
                className="container"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {images.length === 0 ? (
                    <div className="drop-box">
                        <span className="drop-text">
                            Drag and drop docs here
                        </span>
                        <input
                            type="file"
                            id="image-upload-drop"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                ) : (
                    <div className="image-preview">
                        {images.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.data} alt={image.name} />
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(index)}>
                                    Delete
                                </button>
                                <button className="pdf-btn" 
                                        onClick={generatePDF}>
                                    Convert to PDF
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
