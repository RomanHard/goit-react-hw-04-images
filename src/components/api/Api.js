import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '27264356-434762754b358cf0758f386e7';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (searchQuery, page) => {
  try {
    const { data } = await axios.get('', {
      params: {
        q: searchQuery,
        page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });

    const images = data.hits.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    }));
    
    const totalHits = data.totalHits;
    const isLoadMoreButtonVisible = totalHits > 0 && totalHits > page * 12;
    
    return { images, totalHits, isLoadMoreButtonVisible };
  } catch (error) {
    console.log(error);
    return { images: [], totalHits: null, isLoadMoreButtonVisible: false };
    }
    };
    
    const useImages = (searchQuery) => {
    const [images, setImages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadMoreButtonVisible, setIsLoadMoreButtonVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [totalHits, setTotalHits] = useState(null);
    
    useEffect(() => {
    if (searchQuery !== '') {
    setIsLoading(true);
    fetchImages(searchQuery, currentPage).then(({ images, totalHits, isLoadMoreButtonVisible }) => {
    setImages(images);
    setTotalHits(totalHits);
    setIsLoadMoreButtonVisible(isLoadMoreButtonVisible);
    setIsLoading(false);
    });
    }
    }, [searchQuery, currentPage]);
    
    useEffect(() => {
    if (currentPage > 1) {
    fetchImages(searchQuery, currentPage).then(({ images }) => {
    setImages(prevImages => [...prevImages, ...images]);
    });
    }
    }, [searchQuery, currentPage]);
    
    const handleLoadMoreClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    };
    
    return { images, isLoading, isLoadMoreButtonVisible, totalHits, handleLoadMoreClick };
    };
    
    export default useImages;
    
    
    
    
    
    