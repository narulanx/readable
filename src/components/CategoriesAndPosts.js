import React, { Component } from 'react'
import * as ReadableAPI from '../utils/ReadableAPI'
import { Grid, Row, Col } from 'react-bootstrap'
import Categories from './Categories'
import PostList from './PostList'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadCategories } from '../actions'

class CategoriesAndPosts extends Component {
  state = {
    sortMethod: 'votescore'
  }

  changeSort = function(event) {
    this.setState({sortMethod: event.target.value})
  }
  
  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.props.loadCategories(categories)
    })
  }

  render() {
    const { categories, category } = this.props
    const options = [
      { value: 'votescore', label: 'Vote Score' },
      { value: 'timestamp', label: 'TimeStamp' }]
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={4}>
          <Categories 
            categories={categories} 
            onClickHandle={(category) => this.categoryClick(category)}
            selectedCategory={category}/>
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
            <PostList sortMethod={this.state.sortMethod} onClickSelect={(id) => this.clickPost(id)} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: (categories) => dispatch(loadCategories(categories))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesAndPosts))
