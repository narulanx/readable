import React from 'react'
import { Button, Modal, FormGroup, FormControl} from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateComment, addComment, editComment } from '../actions'
import * as ReadableAPI from '../utils/ReadableAPI'
import { guid } from '../utils/helpers'

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

  submitComment(e) {
    e.preventDefault()
    let valid = true
    let addEditComment = this.props.addEditComment
    const entries = Object.keys(addEditComment);
    entries.forEach((entry) => {
      if (addEditComment[entry].trim() === '') {
        this.setValidation(entry)
        valid = false
      }
    })
    if (valid) {
      if (this.props.type === 'add') {
        const comment = this.props.addEditComment
        comment.id = guid()
        comment.timestamp = Math.floor(Date.now())
        comment.parentId = this.props.selectedPost.id
        ReadableAPI.createComment(comment).then((data) => {
          this.props.addComment(data)
          this.props.onCloseComment()
        })
      } else if (this.props.type === 'edit') {
        const comment = this.props.addEditComment
        comment.timestamp = Math.floor(Date.now())
        ReadableAPI.editComment(comment.id, comment).then((data) => {
          this.props.editComment(comment)
          this.props.onCloseComment()
        })
      }
    }
  }

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

function mapStateToProps ({ addEditComment, selectedPost }) {
  return {
    addEditComment, 
    selectedPost
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateComment: (name, value) => dispatch(updateComment(name, value)),
    addComment: (comment) => dispatch(addComment(comment)),
    editComment: (comment) => dispatch(editComment(comment))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditComment))