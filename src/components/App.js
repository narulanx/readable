import React, { Component } from 'react';
import '../App.css';
import { loadPost } from '../actions'
import * as ReadableAPI from '../utils/ReadableAPI'
import { capitalize, getSocialDate } from '../utils/helpers'
import { Navbar, Nav, NavItem, Grid, Row, Col, Button, Well} from 'react-bootstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ArrowUp from 'react-icons/lib/fa/angle-up'
import ArrowDown from 'react-icons/lib/fa/angle-down'
import User from 'react-icons/lib/fa/user'

class App extends Component {

  state = {
    categories: [],
    posts: []
  }

  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.setState({ categories })
    })

    ReadableAPI.getAllPosts().then((data) => { 
      this.props.loadPosts(data.sort(this.sortByVoteScore)) 
    })
  }

  sortByVoteScore = function(a, b) {
    return a.voteScore < b.voteScore
  }

  sortByTimestamp = function(a, b) {
    return a.timestamp < b.timestamp
  }

  filter = function(props, event) {
    if (event.target.value === 'votescore') {
      props.loadPosts(props.post.sort(this.sortByVoteScore)) 
    } else if (event.target.value === 'timestamp') {
      props.loadPosts(props.post.sort(this.sortByTimestamp)) 
    }
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
                  <span>Filter By  </span>
                  <select 
                    id="filterBy"
                    onChange={(e) => (this.filter(this.props, e))} 
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
                        <div><p className="float-right">Posted on {getSocialDate(new Date(p.timestamp))}</p></div>
                      </Col>
                    </Row>
                  </Well>
                 ))}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps ({ category, post, comment }) {
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
