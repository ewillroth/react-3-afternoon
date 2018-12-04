import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state={
      inputvalue: ''
    }
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input value={this.props.inputValue} placeholder="Search Your Feed" onChange={this.props.searchInput} ></input>

          <SearchIcon onClick={this.props.clickSearch} id="Search__icon" />
        </div>
        
      </section>
    )
  }
}