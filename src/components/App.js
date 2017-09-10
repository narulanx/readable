import React, { Component } from 'react';
import '../App.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import { capitalize } from '../utils/helpers'
import { Navbar, Nav, NavItem, Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux'

class App extends Component {

  state = {
    categories: []
  }

  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.setState({ categories })
    })
  }

  render() {
    const { categories } = this.state
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
              <h3>Posts</h3>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps ({ category, post, comment }) {
  return {
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
    // selectRecipe: (data) => dispatch(addRecipe(data)),
    // remove: (data) => dispatch(removeFromCalendar(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
