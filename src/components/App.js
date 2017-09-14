import React, { Component } from 'react'
import '../App.css'
import { loadPost } from '../actions'
import Categories from './Categories'
import PostList from './PostList'
import AddPost from './AddPost'
import * as ReadableAPI from '../utils/ReadableAPI'
import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'

class App extends Component {

  state = {
    categories: [],
    posts: [],
    showAddPost: false
  }

  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.setState({ categories })
    })

    ReadableAPI.getAllPosts().then((data) => { 
      this.props.loadPosts(
        data.filter((post) => (post.deleted === false)).sort(this.sortByVoteScore)
      ) 
    })
  }

  filter = function(event) {
    if (event.target.value === 'votescore') {
      this.props.loadPosts(this.props.post.sort(function(a, b) {
        return a.voteScore < b.voteScore
      })) 
    } else if (event.target.value === 'timestamp') {
      this.props.loadPosts(this.props.post.sort(function(a, b) {
        return a.timestamp < b.timestamp
      })) 
    }
  }

  addPostOpen = function() {
    this.setState({ showAddPost: true })
  }

  render() {
    const { categories } = this.state
    const { post } = this.props
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
              <Categories categories={categories}/>
            </Col>
            <Col xs={8}>
              <Row className="show-grid">
                <Col xs={9}><h4 className="float-left">Posts</h4></Col>
                <Col xs={3}>
                  <span>Sort By  </span>
                  <select 
                    id="filterBy"
                    onChange={(e) => this.filter(e)} 
                    defaultValue={options[0].value}>
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </Col>
              </Row>
              <PostList post={post} />
            </Col>
          </Row>
        </Grid>
        <AddPost 
          showAddPost={this.state.showAddPost}
          addPostClose={() => this.setState({ showAddPost: false })}
        />
      </div>
    );
  }
}

function mapStateToProps ({ post }) {
  return {
    post: post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: (data) => dispatch(loadPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
