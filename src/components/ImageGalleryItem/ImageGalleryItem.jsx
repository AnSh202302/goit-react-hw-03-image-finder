import Modal from 'components/Modal/Modal';
import { Component } from 'react';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  openModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    const { webformatURL, tags, largeImageURL } = this.props.img;
    const { showModal } = this.state;

    return (
      <>
        <li className="ImageGalleryItem" onClick={this.openModal}>
          <img
            className="ImageGalleryItem-image"
            src={webformatURL}
            alt={tags}
          />
        </li>
        {showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
