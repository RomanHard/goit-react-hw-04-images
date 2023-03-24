import React, { useState, useEffect } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Spinner from './loader/Loader';
import Modal from './modal/Modal';
import { fetchImages } from './api/Api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadMoreButtonVisible, setIsLoadMoreButtonVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    if (searchQuery !== '') {
      setIsLoading(true);
      setImages([]);
      fetchImages(searchQuery, currentPage).then(({ images, totalHits, isLoadMoreButtonVisible }) => {
        setImages(prevImages => [...prevImages, ...images]);
        setTotalHits(totalHits);
        setIsLoadMoreButtonVisible(isLoadMoreButtonVisible);
        setIsLoading(false);
      });
    }
  }, [searchQuery, currentPage, totalHits]);

  const handleSubmit = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setIsLoadMoreButtonVisible(false);
    setIsLoading(false);
    setTotalHits(null);
    setImages([]);
  };

  const handleLoadMoreClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setLargeImageURL(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleOpenModal} />
      )}
      {isLoading && <Spinner />}
      {isLoadMoreButtonVisible && (
        <Button onClick={handleLoadMoreClick} disabled={isLoading} />
      )}
      {!isLoadMoreButtonVisible && images.length > 0 && <p>No more images to load.</p>}
      {largeImageURL && (
        <Modal largeImageURL={largeImageURL} closeModal={handleCloseModal} />
      )}
    </div>
  );
}


export default App;

