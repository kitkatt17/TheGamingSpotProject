import React from "react";
import Gallery from "react-photo-gallery";

const ImageCollage = ({ images }) => {
  const calculateColumnWidth = () => {
    const screenWidth = window.innerWidth;
    return Math.floor(screenWidth * 0.4);
  };

  const getPhotos = () => {
    return images.map((image, index) => ({
      src: image,
      width: 1,
      height: 1,
      key: index.toString(),
    }));
  };

  return (
    <Gallery
      photos={getPhotos()}
      direction="row"
      margin={5}
      columns={1}
      targetRowHeight={calculateColumnWidth()}
    />
  );
};

export default ImageCollage;
