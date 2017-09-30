import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { capitalize } from '../utils/helpers'
import { withRouter } from 'react-router-dom'
import * as ReadableAPI from '../utils/ReadableAPI'
import { loadPost, fetchPosts } from '../actions/PostActions'
import { connect } from 'react-redux'

class Categories extends Component {
  componentDidMount() {
    if (this.props.selectedCategory === 'all') {
      ReadableAPI.getAllPosts().then((data) => {
        const posts = data.filter((post) => (post.deleted === false))
            .map((post) => {
              return ReadableAPI.getComments(post.id).then((comment) => {
                post.commentCount = comment.length
                return post
            })
          })
        Promise.all(posts).then((post) => {
          this.props.loadPost(post)
        })
      })
    } else {
      this.categoryClick(this.props.selectedCategory)
    } 
  }

  categoryClick(category) {
    this.props.fetchPosts(category)
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

export default withRouter(connect(null, {loadPost, fetchPosts})(Categories))