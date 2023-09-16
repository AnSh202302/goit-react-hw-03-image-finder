import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Component } from 'react';
import { Button } from 'components/Button/Button';
import { getImg } from 'services/pixabay-api';

export default class ImageGallery extends Component {
  state = {
    img: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.imgInfo !== this.props.imgInfo) {
      this.setState({ status: 'pending' });

      getImg(this.props.imgInfo)
        .then(res => res.json())
        .then(img => {
          this.setState({ img: img.hits, status: 'resolved' });
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  searchImg = e => {
    console.log(e.target);
    console.log(this.state.img);
  };
  render() {
    const { img, error, status } = this.state;

    if (status === 'pending') return <Loader />;

    if (status === 'rejected') return <p>{error.message}</p>;

    if (status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery">
            {img.map(el => (
              <ImageGalleryItem img={el} key={el.id} />
            ))}
          </ul>
          <Button type="button" className="Button"></Button>
        </>
      );
    }
    // return (
    //   <>
    //     {error && <p>{error.message}</p>}
    //     {loading && <Loader />}
    //     {img && (
    //       <ul className="ImageGallery">
    //         {img.map(el => (
    //           <ImageGalleryItem
    //             key={el.id}
    //             tags={el.tags}
    //             webformatURL={el.webformatURL}
    //           />
    //         ))}
    //       </ul>
    //     )}
    //   </>
    // );
  }
}
