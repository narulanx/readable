import React from 'react'
import { Button, Modal, FormGroup, FormControl} from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class AddEditComment extends React.Component {
  state = {
    validations: {
      body: null,
      author: null
    }
  }

  handleChange(e){
    const addEditComment = this.props.addEditComment
    addEditComment[e.target.name] = e.target.value
    this.props.updateComment(e.target.name, e.target.value)
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

  /*submitPost(e) {
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
          this.props.addPostClose()
        })
      } else if (this.props.type === 'edit') {
        const post = this.props.addEditPost
        ReadableAPI.editPost(post.id, post).then((data) => {
          this.props.selectPost(post)
          this.props.addPostClose()
        })
      }
    }
  }*/

  render() {
    const { showAddComment, onCloseComment } = this.props
    return (
      <Modal show={showAddComment} onHide={() => onCloseComment()}>
        <form onSubmit={(e) => this.submitComment(e)} id={this.props.addEditComment.id}>
          <Modal.Header closeButton>
            <Modal.Title>Add Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="commentBody" validationState={this.state.validations.body}>
              <FormControl componentClass="textarea" placeholder="Comment" value={this.props.addEditComment.body}
                name="body" onChange={(e) => this.handleChange(e)}  />
            </FormGroup>
            <FormGroup controlId="commentAuthor" validationState={this.state.validations.author}>
              <FormControl type="text" placeholder="Author" value={this.props.addEditComment.author} 
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

function mapStateToProps ({ addEditComment }) {
  return {
    addEditComment
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditComment))