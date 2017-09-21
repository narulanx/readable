import React, { Component } from 'react'
import '../App.css'
import { loadPost, loadCategories, addPost, selectPost, loadComments, openAddPost } from '../actions'
import Categories from './Categories'
import PostList from './PostList'
import AddPost from './AddPost'
import PostDetails from './PostDetails'
import * as ReadableAPI from '../utils/ReadableAPI'
import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

class App extends Component {

  state = {
    showAddPost: false,
    sortMethod: 'votescore'
  }

  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.props.loadCategories(categories)
    })

    this.getAllPosts()
  }

  getAllPosts = function() {
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
    this.props.openAddPost()
    this.setState({ showAddPost: true })
  }

  categoryClick = function(category) {
    ReadableAPI.getCategoryPosts(category).then((data) => {
      this.props.loadPosts(
        data.filter((post) => (post.deleted === false))
      ) 
    })
  }

  clickPost = function(id) {
    ReadableAPI.getPostDetails(id).then((data) => {
      this.props.selectPost(data) 
    })

    ReadableAPI.getComments(id).then((data) => {
      this.props.loadComments(data) 
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
              <Link to="/" onClick={(category) => this.getAllPosts()}>Readable</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to="/"><NavItem eventKey={1} onClick={(category) => this.getAllPosts()}>Home</NavItem></LinkContainer>
            <NavItem eventKey={2} onClick={() => this.addPostOpen()}>Add Post</NavItem>
          </Nav>
        </Navbar>
        <Route exact path="/" render={() => (
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
                <PostList post={post} sortMethod={this.state.sortMethod} onClickSelect={(id) => this.clickPost(id)} />
              </Col>
            </Row>
          </Grid>
        )} />
        <Route path="/post" render={() => (
          <PostDetails />
        )} />
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

function mapStateToProps ({ categories, post, addEditPost }) {
  return {
    categories: categories,
    post: post,
    addEditPost: addEditPost
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: (categories) => dispatch(loadCategories(categories)),
    loadPosts: (data) => dispatch(loadPost(data)),
    addPost: (post) => dispatch(addPost(post)),
    selectPost: (selectedPost) => dispatch(selectPost(selectedPost)),
    loadComments: (comments) => dispatch(loadComments(comments)),
    openAddPost: () => dispatch(openAddPost())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
