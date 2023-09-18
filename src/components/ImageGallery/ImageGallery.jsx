import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Component } from 'react';
import { Button } from 'components/Button/Button';
import { getImg } from 'services/pixabay-api';

export default class ImageGallery extends Component {
  state = {
    img: [],
    error: null,
    status: 'idle',
    page: 1,
    totalPage: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imgValue } = this.props;
    const { page, img } = this.state;

    if (prevProps.imgValue !== imgValue || prevState.page !== page) {
      if (img.length === 0 || prevProps.imgValue !== imgValue) {
        this.setState({ status: 'pending' });
      }
      if (prevProps.imgValue !== imgValue) {
        this.setState({ page: 1 });
      }
      getImg(imgValue, page)
        .then(res => res.json())
        .then(img => {
          console.log(img);
          this.setState(prevState => ({
            // page: prevProps.imgValue !== imgValue ? 1 : this.state.page,
            img:
              prevProps.imgValue !== imgValue
                ? img.hits
                : [...prevState.img, ...img.hits],
            status: 'resolved',
            totalPage: img.totalHits / 12,
          }));
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  handleButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { img, error, status, page, totalPage } = this.state;

    if (status === 'idle') return;

    if (status === 'pending') return <Loader />;

    if (status === 'rejected') return <p>{error.message}</p>;

    if (img && status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery">
            {img.map(el => (
              <ImageGalleryItem img={el} key={el.id} />
            ))}
          </ul>
          {img.length !== 0 && page < totalPage && (
            <Button
              type="button"
              className="Button"
              onClick={this.handleButtonClick}
            >
              Load more
            </Button>
          )}
        </>
      );
    }
  }
}
