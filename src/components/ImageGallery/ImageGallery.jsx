import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await imagesApi.fetchImages(inputValue, 1);
        const newImages = data.hits;
        if (newImages.length === 0) {
          throw new Error('No photos found for this query');
        }
        setSearchQuery(inputValue);
        setCurrentPage(1);
        setImages(newImages);
        setTotalHits(data.totalHits);
      } catch (error) {
        Report.info('No photos found for this query!', '', 'Ok');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (inputValue !== '') {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await imagesApi.fetchImages(inputValue, currentPage);
        const newImages = data.hits;
        setImages(prevImages => [...prevImages, ...newImages]);
      } catch (error) {
        Report.info('No photos found for this query!', '', 'Ok');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (currentPage > 1) {
      fetchData();
    }
  }, [currentPage]);

  useEffect(() => {
    setImages([]);
  }, [inputValue]);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const shouldRenderLoadMore = images.length < totalHits;

  return (
    <div>
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
