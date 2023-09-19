import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Component } from 'react';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { getImg } from 'services/pixabay-api';

export default class App extends Component {
  state = {
    queryImg: '',
    gallery: [],
    error: null,
    status: 'idle',
    page: 1,
    totalPage: 0,
  };
  componentDidUpdate(_, prevState) {
    const fetchData = async () => {
      getImg(this.state.queryImg, this.state.page)
        .then(res => res.json())
        .then(img => {
          this.setState(prevState => ({
            gallery:
              prevState.queryImg !== this.state.queryImg
                ? img.hits
                : [...prevState.gallery, ...img.hits],
            status: 'resolved',
            totalPage: img.totalHits / 12,
          }));
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    };

    if (prevState.queryImg !== this.state.queryImg) {
      this.setState({ status: 'pending' });
      fetchData();
    } else if (prevState.page !== this.state.page) {
      fetchData();
    }
  }

  handleButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  handleFormSubmit = imgValue => {
    this.setState({
      queryImg: imgValue,
      page: 1,
      gallery: [],
    });
  };

  render() {
    const { status, error, gallery, page, totalPage } = this.state;

    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'rejected' && <p p> {error.message}</p>}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && <ImageGallery img={this.state.gallery} />}
        {gallery.length !== 0 && page < totalPage && (
          <Button
            type="button"
            className="Button"
            onClick={this.handleButtonClick}
          >
            Load more
          </Button>
        )}
      </div>
    );
    // }
  }
}
