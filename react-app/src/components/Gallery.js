import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import Fe from "../assets/landing-page/Fe.png";
import FeThumb from "../assets/landing-page/Fe-thumb.png";
import Al from "../assets/landing-page/Al.png";
import AlThumb from "../assets/landing-page/Al-thumb.png";
import Fe3Al from "../assets/landing-page/Fe3Al.png";
import Fe3AlThumb from "../assets/landing-page/Fe3Al-thumb.png";

export default class Gallery extends Component {
  render() {
    const materials = [
      {
        original: Fe,
        thumbnail: FeThumb,
        description: "Young's modulus of Fe compound.",
      },
      {
        original: Al,
        thumbnail: AlThumb,
        description: "Young's modulus of Al compound.",
      },
      {
        original: Fe3Al,
        thumbnail: Fe3AlThumb,
        description: "Young's modulus of Fe3Al composite.",
      },
    ];

    return (
      <ImageGallery
        items={materials}
        slideInterval={5000}
        autoPlay={true}
        lazyLoad={true}
        showFullscreenButton={false}
        showPlayButton={false}
        style={{ maxWidth: "330px" }}
      />
    );
  }
}
