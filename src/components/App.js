import React, { Component } from 'react';
import '../App.css';
import { loadPost } from '../actions'
import * as ReadableAPI from '../utils/ReadableAPI'
import { capitalize, getSocialDate } from '../utils/helpers'
import { Navbar, Nav, NavItem, Grid, Row, Col, Button, Well, Modal} from 'react-bootstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ArrowUp from 'react-icons/lib/fa/angle-up'
import ArrowDown from 'react-icons/lib/fa/angle-down'
import User from 'react-icons/lib/fa/user'

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

  sortByVoteScore = function(a, b) {
    return a.voteScore < b.voteScore
  }

  sortByTimestamp = function(a, b) {
    return a.timestamp < b.timestamp
  }

  filter = function(event) {
    if (event.target.value === 'votescore') {
      this.props.loadPosts(this.props.post.sort(this.sortByVoteScore)) 
    } else if (event.target.value === 'timestamp') {
      this.props.loadPosts(this.props.post.sort(this.sortByTimestamp)) 
    }
  }

  addPostOpen = function() {
    this.setState({ showAddPost: true })
  }

  addPostClose = function() {
    this.setState({ showAddPost: false })
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
              <h3>Categories</h3>
              <div className="category-buttons">
                { categories.map((category) => (
                  <Button key={category.name} bsStyle="primary" bsSize="large" block>{capitalize(category.name)}</Button>
                ))}
              </div>
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
               <div>
                 { post.map((p) => (
                  <Well key={p.id} bsSize="large">
                    <Row className="show-grid">
                      <Col xs={1}>
                        <ArrowUp size={30}></ArrowUp>
                        <span>{p.voteScore}</span>
                        <ArrowDown size={30}></ArrowDown>
                      </Col>
                      <Col xs={11} className="column-flex">
                        <div><Link className="float-left" to="/post">{p.title}</Link></div>
                        <div><p className="float-left">{p.body}</p></div>
                        <div><p className="float-right"><User size={20} />  {p.author}</p></div>
                        <div>
                          <p className="float-left"><em>{capitalize(p.category)}</em></p>
                          <p className="float-right">Posted on {getSocialDate(new Date(p.timestamp))}</p></div>
                      </Col>
                    </Row>
                  </Well>
                 ))}
              </div>
            </Col>
          </Row>
        </Grid>
        <Modal show={this.state.showAddPost} onHide={() => this.addPostClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Add Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.addPostClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps ({ post }) {
  return {
    post: post
    /*calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal] ? food[calendar[day][meal]] : null
        return meals;
      }, {})
    }))*/
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: (data) => dispatch(loadPost(data))
    // selectRecipe: (data) => dispatch(addRecipe(data)),
    // remove: (data) => dispatch(removeFromCalendar(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
