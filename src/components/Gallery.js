import React, { Component } from "react";
import ImageGallery from "react-image-gallery";

export default class Gallery extends Component {
  render() {
    const images = [1, 2, 3, 4, 5, 6].map(i => ({
      original: `./images/${i}.png`
    }));

    return (
      <ImageGallery
        items={images}
        slideInterval={3500}
        autoPlay={true}
        lazyLoad={true}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={true}
      />
    );
  }
}
