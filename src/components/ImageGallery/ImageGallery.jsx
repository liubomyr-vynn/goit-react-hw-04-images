import React, { useState, useEffect, useRef } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import imagesApi from '../../Services/Gallery-api';
import Loader from '../Loader/Loader';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { nanoid } from 'nanoid';

const ImageGallery = ({ inputValue }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [isValidQuery, setIsValidQuery] = useState(true);
  const galleryRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await imagesApi.fetchImages(inputValue, 1);
        const newImages = data.hits;
        if (newImages.length === 0) {
          setIsValidQuery(false);
          setImages([]);
          throw new Error('No photos found for this query');
        }
        setSearchQuery(inputValue);
        setImages(newImages);
        setTotalHits(data.totalHits);
        setIsValidQuery(true);
        scrollToTop();
      } catch (error) {
        Report.info('No photos found for this query!', '', 'Ok');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (inputValue !== '') {
      setCurrentPage(1);
      setIsValidQuery(true);
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    if (searchQuery !== '' && currentPage > 1) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await imagesApi.fetchImages(searchQuery, currentPage);
          const newImages = data.hits;
          if (newImages.length === 0) {
            throw new Error('No photos found for this query');
          }
          setImages(prevImages => [...prevImages, ...newImages]);
          setTotalHits(data.totalHits);
        } catch (error) {
          Report.info('No photos found for this query!', '', 'Ok');
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [searchQuery, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const shouldRenderLoadMore = isValidQuery && images.length < totalHits;

  const scrollToTop = () => {
    galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={galleryRef}>
      <ul className="ImageGallery">
        {searchQuery !== '' &&
          images.map(image => (
            <ImageGalleryItem
              key={nanoid()}
              largeImage={image.largeImageURL}
              webformat={image.webformatURL}
            />
          ))}
      </ul>
      {loading && <Loader />}
      {shouldRenderLoadMore && <Button onChange={handleLoadMore} />}
    </div>
  );
};

export default ImageGallery;
