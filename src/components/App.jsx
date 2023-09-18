import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

export default class App extends Component {
  state = {
    img: '',
  };
  handleFormSubmit = imgValue => {
    this.setState({ img: imgValue });
  };

  render() {
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imgValue={this.state.img} />

        <ToastContainer />
      </div>
    );
  }
}
