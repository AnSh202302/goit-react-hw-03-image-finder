import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

export default class Searchbar extends Component {
  state = {
    imgSearch: '',
  };

  handleImgSearchChange = e => {
    this.setState({ imgSearch: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imgSearch.trim() === '') {
      return alert('Enter value!');
    }
    this.props.onSubmit(this.state.imgSearch);
    this.reset();
  };
  reset() {
    this.setState({ imgSearch: '' });
  }

  render() {
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <BsSearch size={20} />
          </button>

          <input
            value={this.state.imgSearch}
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
