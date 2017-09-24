import React, { Component } from 'react'
import AddEditPost from './AddEditPost'
import PostDetails from './PostDetails'
import Header from './Header'
import CategoriesAndPosts from './CategoriesAndPosts'
import { Route, withRouter } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header getAllPosts={this.getAllPosts} />
        <Route exact path="/" render={() => (
          <CategoriesAndPosts category="all" />
        )} />
        <Route exact path="/category/:category" render={({ match }) => {
          const { category } = match.params
          return <CategoriesAndPosts category={category} />
        }} />
        <Route exact path="/post/:id" render={({ match }) => {
          const { id } = match.params
          return <PostDetails postId={id} />
        }} />
        <Route exact path="/post/:id/edit" render={({ match }) => {
          const { id } = match.params
          return <AddEditPost postId={id} type="edit" />
        }} />
        <Route exact path="/newPost" render={() => (
          <AddEditPost type="add" />
        )} />
      </div>
    );
  }
}

export default withRouter(App)
