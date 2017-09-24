import React from 'react'
import { Button, FormGroup, FormControl, Grid} from 'react-bootstrap'
import { updatePost, selectPost, editPost, addPost, loadCategories, openEditPost } from '../actions'
import { capitalize } from '../utils/helpers'
import * as ReadableAPI from '../utils/ReadableAPI'
import { guid } from '../utils/helpers'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class AddEditPost extends React.Component {
  state = {
    validations: {
      title: null,
      category: null,
      body: null,
      author: null
    }
  }

  componentDidMount() {
    if (this.props.categories.length === 0) {
      ReadableAPI.getCategories().then((categories) => {
        this.props.loadCategories(categories)
      })
    }
    if (this.props.type === 'edit') {
      ReadableAPI.getPostDetails(this.props.postId).then((data) => {
        const {id, title, category, body, author} = data
        this.props.openEditPost({ id, title, category, body, author })
      })
    }
  }

  handleChange(e){
    const addEditPost = this.props.addEditPost
    addEditPost[e.target.name] = e.target.value
    this.props.updatePost(e.target.name, e.target.value)
    if (e.target.value.trim() !== '') {
      const validations = this.state.validations
      validations[e.target.name] = null
      this.setState({ validations })
    }
  }

  setValidation(type) {
    const validations = this.state.validations
    validations[type] = "error"
    this.setState({ validations })
  }

  submitPost(e) {
    e.preventDefault()
    let valid = true
    let addEditPost = this.props.addEditPost
    const entries = Object.keys(addEditPost);
    entries.forEach((entry) => {
      if (addEditPost[entry].trim() === '') {
        this.setValidation(entry)
        valid = false
      }
    })
    if (valid) {
      if (this.props.type === 'add') {
        const post = this.props.addEditPost
        post.id = guid()
        post.timestamp = Math.floor(Date.now())
        ReadableAPI.createPost(post).then((data) => {
          this.props.addPost(data)
        })
        this.props.history.push('/')
      } else if (this.props.type === 'edit') {
        const post = this.props.addEditPost
        ReadableAPI.editPost(post.id, post).then((data) => {
          this.props.editPost(post)
        })
        this.props.history.push(`/post/${post.id}`)
      }
    }
  }

  render() {
    const { categories } = this.props
    return (
      <form onSubmit={(e) => this.submitPost(e)} id={this.props.addEditPost.id}>
        <Grid>
          <h4>Add Post</h4>
          <FormGroup controlId="postTitle" validationState={this.state.validations.title}>
            <FormControl type="text" placeholder="Title" value={this.props.addEditPost.title} 
              name="title" onChange={(e) => this.handleChange(e)} />
          </FormGroup>
          <FormGroup controlId="postCategory" validationState={this.state.validations.category}>
            <FormControl componentClass="select" name="category" 
              value={this.props.addEditPost.category} onChange={(e) => this.handleChange(e)} >
              <option value=""></option>
              {categories.map((cat, i) => (
                <option key={i} value={cat.name}>{capitalize(cat.name)}</option>
              ))}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="postBody" validationState={this.state.validations.body}>
            <FormControl componentClass="textarea" placeholder="Post" value={this.props.addEditPost.body}
              name="body" onChange={(e) => this.handleChange(e)}  />
          </FormGroup>
          <FormGroup controlId="postAuthor" validationState={this.state.validations.author}>
            <FormControl type="text" placeholder="Author" value={this.props.addEditPost.author} 
              name="author" onChange={(e) => this.handleChange(e)} />
          </FormGroup>
          <Button type="submit">Post</Button>
        </Grid>
      </form>
    )
  }
}

function mapStateToProps ({ addEditPost, selectedPost, categories }) {
  return {
    addEditPost: addEditPost,
    selectedPost: selectedPost,
    categories: categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePost: (name, value) => dispatch(updatePost(name, value)),
    selectPost: (selectedPost) => dispatch(selectPost(selectedPost)),
    editPost: (post) => dispatch(editPost(post)),
    addPost: (post) => dispatch(addPost(post)),
    openEditPost: (post) => dispatch(openEditPost(post)),
    loadCategories: (categories) => dispatch(loadCategories(categories))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditPost))