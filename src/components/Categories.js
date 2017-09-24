import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { capitalize } from '../utils/helpers'
import { withRouter } from 'react-router-dom'
import * as ReadableAPI from '../utils/ReadableAPI'
import { loadPost } from '../actions'
import { connect } from 'react-redux'

class Categories extends Component {
  componentDidMount() {
    if (this.props.selectedCategory === 'all') {
      ReadableAPI.getAllPosts().then((data) => { 
        this.props.loadPosts(
          data.filter((post) => (post.deleted === false))
        ) 
      })
    } else {
      this.categoryClick(this.props.selectedCategory)
    } 
  }

  categoryClick(category) {
    ReadableAPI.getCategoryPosts(category).then((data) => {
      this.props.loadPosts(
        data.filter((post) => (post.deleted === false))
      ) 
    })
    this.props.history.push(`/category/${category}`)
  }

  render() {
    const { categories } = this.props
    return (
      <div>
        <h3>Categories</h3>
        <div className="category-buttons">
          { categories.map((category, index) => (
            <Button key={index} bsStyle="primary" bsSize="large" block
              onClick={() => (this.categoryClick(category.name))}>{capitalize(category.name)}</Button>
          ))}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: (data) => dispatch(loadPost(data))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Categories))