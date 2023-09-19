import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';

export default class ImageGallery extends Component {
  render() {
    return (
      <ul className="ImageGallery">
        {this.props.img.map(el => (
          <ImageGalleryItem img={el} key={el.id} />
        ))}
      </ul>
    );
  }
}
