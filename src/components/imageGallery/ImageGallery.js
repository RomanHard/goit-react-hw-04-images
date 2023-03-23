import React from 'react';
import './ImageGallery-module.css';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className="gallery">
      {images.map((image, index) => (
        <ImageGalleryItem
          key={`${image.webformatURL}-${index}`}
          webformatURL={image.webformatURL}
          onClick={() => onClick(image.largeImageURL)}
        />
      ))}
    </ul>
  );
}