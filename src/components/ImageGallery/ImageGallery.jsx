import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import imagesApi from '../../Services/Gallery-api';
import Loader from '../Loader/Loader';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { nanoid } from 'nanoid';

class ImageGallery extends Component {
  state = {
    searchQuery: '',
    currentPage: 1,
    images: [],
    loading: false,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevInput = prevProps.inputValue;
    const nextInput = this.props.inputValue;
    const prevStatePage = prevState.currentPage;
    const nextStatePage = this.state.currentPage;

    if (prevInput !== nextInput) {
      this.setState({ loading: true });

      imagesApi
        .fetchImages(nextInput, 1)
        .then(data => {
          const newImages = data.hits;
          if (newImages.length === 0) {
            throw new Error('No photos found for this query');
          }
          this.setState({
            searchQuery: nextInput,
            currentPage: 1,
            images: newImages,
            totalHits: data.totalHits,
          });
        })
        .catch(error => {
          Report.info('No photos found for this query!', '', 'Ok');
          console.log(error);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    } else if (prevStatePage !== nextStatePage) {
      this.setState({ loading: true });

      imagesApi
        .fetchImages(nextInput, nextStatePage)
        .then(data => {
          const newImages = data.hits;
          this.setState(prevState => ({
            images: [...prevState.images, ...newImages],
          }));
        })
        .catch(error => {
          Report.info('No photos found for this query!', '', 'Ok');
          console.log(error);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { searchQuery, images, loading, totalHits } = this.state;
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
        {shouldRenderLoadMore && <Button onChange={this.handleLoadMore} />}
      </div>
    );
  }
}

export default ImageGallery;
