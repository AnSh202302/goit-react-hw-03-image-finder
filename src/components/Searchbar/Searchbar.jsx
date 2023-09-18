import { toast } from 'react-toastify';
import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

export default class Searchbar extends Component {
  state = {
    imgSearch: '',
  };

  handleImgSearchChange = e => {
    this.setState({ imgSearch: e.currentTarget.value.toLowerCase() });
  };
  handleClick = e => {
    e.preventDefault();
    if (this.state.imgSearch.trim() === '') {
      return toast('Enter value!');
    }
    this.props.onSubmit(this.state.imgSearch);
    // this.setState({ imgSearch: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="searchForm">
          <button
            type="submit"
            className="SearchForm-button"
            onClick={this.handleClick}
          >
            <BsSearch size={20} />
          </button>

          <input
            className="SearchForm-input "
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleImgSearchChange}
          />
        </form>
      </header>
    );
  }
}
