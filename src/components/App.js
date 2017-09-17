import React, { Component } from 'react'
import '../App.css'
import { loadPost, loadCategories, addPost } from '../actions'
import Categories from './Categories'
import PostList from './PostList'
import AddPost from './AddPost'
import * as ReadableAPI from '../utils/ReadableAPI'
import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'

class App extends Component {

  state = {
    showAddPost: false,
    sortMethod: 'votescore'
  }

  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.props.loadCategories(categories)
    })

    ReadableAPI.getAllPosts().then((data) => { 
      this.props.loadPosts(
        data.filter((post) => (post.deleted === false))
      ) 
    })
  }

  changeSort = function(event) {
    this.setState({sortMethod: event.target.value})
  }

  addPostOpen = function() {
    this.setState({ showAddPost: true })
  }

  categoryClick = function(category) {
    ReadableAPI.getCategoryPosts(category).then((data) => {
      this.props.loadPosts(
        data.filter((post) => (post.deleted === false))
      ) 
    })
  }

  render() {
    const { categories, post, addPost } = this.props
    const options = [
      { value: 'votescore', label: 'Vote Score' },
      { value: 'timestamp', label: 'TimeStamp' }]
    
    return (
      <div className="App">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Readable</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">Home</NavItem>
            <NavItem eventKey={2} onClick={() => this.addPostOpen()}>Add Post</NavItem>
          </Nav>
        </Navbar>
        <Grid>
          <Row className="show-grid">
            <Col xs={4}>
              <Categories categories={categories} onClickHandle={(category) => this.categoryClick(category)}/>
            </Col>
            <Col xs={8}>
              <Row className="show-grid">
                <Col xs={9}><h4 className="float-left">Posts</h4></Col>
                <Col xs={3}>
                  <span>Sort By  </span>
                  <select 
                    id="filterBy"
                    onChange={(e) => this.changeSort(e)}>
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </Col>
              </Row>
              <PostList post={post} sortMethod={this.state.sortMethod} />
            </Col>
          </Row>
        </Grid>
        <AddPost 
          showAddPost={this.state.showAddPost}
          categories={categories}
          addPostClose={() => this.setState({ showAddPost: false })}
          addPost={ (selectedPost) => { addPost(selectedPost) }}
        />
      </div>
    );
  }
}

function mapStateToProps ({ categories, post }) {
  return {
    categories: categories,
    post: post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: (categories) => dispatch(loadCategories(categories)),
    loadPosts: (data) => dispatch(loadPost(data)),
    addPost: (post) => dispatch(addPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
