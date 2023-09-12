import { render } from '@testing-library/react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Component } from 'react';

export default class ImageGallery extends Component {
  state = {
    img: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imgInfo !== this.props.imgInfo) {
      this.setState({ img: null, loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.props.imgInfo}&page=1&key=38692594-46caa16db684ae3e3990f61b0&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error('Errrrrrrorrrrrrr!!!'));
        })

        .then(img => this.setState({ img: img.hits }))
        .catch(error => this.state({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    const { img, loading, error } = this.state;
    return (
      <>
        {error && <p>{error.message}</p>}
        {loading && <Loader />}
        {img && (
          <ul className="ImageGallery">
            {img.map(el => (
              <ImageGalleryItem
                key={el.id}
                tags={el.tags}
                webformatURL={el.webformatURL}
              />
            ))}
          </ul>
        )}
      </>
    );
  }
}
