import React from 'react'
import { Button, Modal, FormGroup, FormControl} from 'react-bootstrap'
import { capitalize } from '../utils/helpers'
import * as ReadableAPI from '../utils/ReadableAPI'
import { guid } from '../utils/helpers'

class AddPost extends React.Component {
  state = {
    values: {
      title: "",
      category: "",
      body: "",
      author:""
    },
    validations: {
      title: null,
      category: null,
      body: null,
      author: null
    }
  }

  handleChange(e){
    const values = this.state.values
    values[e.target.name] = e.target.value
    this.setState({ values })
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
    const entries = Object.keys(this.state.values);
    entries.forEach((entry) => {
      if (this.state.values[entry].trim() === '') {
        this.setValidation(entry)
        valid = false
      }
    })
    if (valid) {
      const post = this.state.values
      post.id = guid()
      post.timestamp = Math.floor(Date.now())
      ReadableAPI.createPost(post).then((data) => {
        this.props.addPost(data)
        this.props.addPostClose()
      })
    }
  }

  render() {
    const { showAddPost, categories, addPostClose } = this.props
    return (
      <Modal show={showAddPost} onHide={() => addPostClose()}>
        <form onSubmit={(e) => {this.submitPost(e)}}>
          <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="postTitle" validationState={this.state.validations.title}>
              <FormControl type="text" placeholder="Title" value={this.state.values.title} 
                name="title" onChange={(e) => this.handleChange(e)} />
            </FormGroup>
            <FormGroup controlId="postCategory" validationState={this.state.validations.category}>
              <FormControl componentClass="select" name="category" 
                value={this.state.values.category} onChange={(e) => this.handleChange(e)} >
                <option value=""></option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat.name}>{capitalize(cat.name)}</option>
                ))}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="postBody" validationState={this.state.validations.body}>
              <FormControl componentClass="textarea" placeholder="Post" value={this.state.values.body}
                name="body" onChange={(e) => this.handleChange(e)}  />
            </FormGroup>
            <FormGroup controlId="postAuthor" validationState={this.state.validations.author}>
              <FormControl type="text" placeholder="Author" value={this.state.values.author} 
                name="author" onChange={(e) => this.handleChange(e)} />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
          <Button type="submit">Post</Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}

export default AddPost