import React, { useState, useEffect } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Spinner from './loader/Loader';
import Modal from './modal/Modal';
import { fetchImages } from './api/Api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadMoreButtonVisible, setIsLoadMoreButtonVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    if (searchQuery !== '') {
      fetchImages(currentPage, searchQuery).then(({ images, totalHits }) => {
        setImages(images);
        setTotalHits(totalHits);
        setIsLoadMoreButtonVisible(true);
      });
    }
  }, [searchQuery, currentPage, totalHits]);


  useEffect(() => {
    if (currentPage > 1) {
      fetchImages(currentPage, searchQuery).then(({ images }) => {
        setImages(prevImages => [...prevImages, ...images]);
      });
    }
  }, [currentPage, searchQuery]);

  const handleSubmit = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setIsLoadMoreButtonVisible(false);
    setIsLoading(false);
    setTotalHits(null);
  };

  const handleLoadMoreClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  const handlCloseModal = () => {
    setLargeImageURL(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {images !== null && (
        <ImageGallery images={images} onClick={handleOpenModal} />
      )}
      {isLoading && <Spinner />}
      {isLoadMoreButtonVisible && (
        <Button onClick={handleLoadMoreClick} disabled={isLoading} />
      )}
      {largeImageURL && (
        <Modal largeImageURL={largeImageURL} closeModal={handlCloseModal} />
      )}
    </div>
  );
}


export default App;

