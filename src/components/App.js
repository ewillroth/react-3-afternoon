import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      searchInput: ''
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchInput = this.searchInput.bind( this );
    this.clickSearch = this.clickSearch.bind( this );
  }
  
  componentDidMount() {
    axios
    .get('https://practiceapi.devmountain.com/api/posts')
    .then(response=>{
      this.setState({
        posts: response.data
      })
    })
  }

  updatePost(id,text){
    axios
    .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
    .then(response=>{
      this.setState({
        posts: response.data
      })
    })
    .catch(console.log("Error"))
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(response=>{
        this.setState({
          posts: response.data
        })
      })
      .catch(console.log("Error"))
  }

  createPost(text) {
    axios
    .post(`https://practiceapi.devmountain.com/api/posts`,{text})
    .then(response=>{
      this.setState({
        posts: response.data
      })
    })
    .catch(console.log("Error"))
  }

  searchInput(e){
    this.setState({
      searchInput: e.target.value
    })
  }

  clickSearch(){
    let searchTerms = this.state.searchInput;
    if(searchTerms){
    axios
      .get(
        "https://practiceapi.devmountain.com/api/posts/filter?text=" +
        encodeURI(searchTerms)
      )
      .then(response => {
        this.setState({
          posts: response.data,
          searchInput: ''
        });
      });
    }
    else{
      axios
        .get('https://practiceapi.devmountain.com/api/posts')
        .then(response => {
          this.setState({
            posts: response.data
          })
        })
    }
  }

  render() {
  const { posts } = this.state;

    return <div className="App__parent">
        <Header inputValue={this.state.inputValue} clickSearch={this.clickSearch} searchInput={this.searchInput} />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />

          {posts.map(post => {
            return <Post key={post.id} id={post.id} text={post.text} date={post.date} updatePostFn={this.updatePost} deletePostFn={this.deletePost} />;
          })}
        </section>
      </div>;
  }
}

export default App;
