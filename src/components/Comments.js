import React from 'react'
import { getSocialDate } from '../utils/helpers'
import { Well, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ArrowUp from 'react-icons/lib/fa/angle-up'
import ArrowDown from 'react-icons/lib/fa/angle-down'
import User from 'react-icons/lib/fa/user'
import Edit from 'react-icons/lib/fa/edit'
import Trash from 'react-icons/lib/fa/trash-o'
import { openAddComment, openEditComment, deleteComment } from '../actions'
import AddEditComment from './AddEditComment'
import * as ReadableAPI from '../utils/ReadableAPI'

class Comments extends React.Component {
  state = {
    showAddComment: false,
    commentModalType: "add"
  }

  addCommentOpen() {
    this.props.openAddComment()
    this.setState({ commentModalType: "add" })
    this.setState({ showAddComment: true })
  }

  addCommentClose() {
    this.setState({ showAddComment: false })
  }

  editCommentOpen(id) {
    ReadableAPI.getCommentDetails(id).then((comment) => {
      const {id, body, author, parentId} = comment
      this.props.openEditComment({id, body, author, parentId})
      this.setState({ commentModalType: "edit" })
      this.setState({ showAddComment: true })
    })
  }

  deleteComment(id) {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      ReadableAPI.deleteComment(id).then(() => {
        this.props.deleteComment(id)
      })
    }
  }

  render() {
    const { comments } = this.props
    return(
      <div>
        <h4>Comments ({ comments.length }) 
          <span className="small-text">
            <button onClick={() => this.addCommentOpen()}><em> Add Comment</em></button>
          </span>
        </h4>
        {comments.sort(function(a, b) {
          return a.voteScore < b.voteScore
        }).map((comment) => (
          <Well key={comment.id}>
            <Row className="show-grid">
              <Col xs={1} className="column-flex">
                <ArrowUp size={30}></ArrowUp>
                <span className="vote">{comment.voteScore}</span>
                <ArrowDown size={30}></ArrowDown>
              </Col>
              <Col xs={11} className="column-flex">
                <div><p>
                  <span className="float-left">{comment.body}</span>
                  <span className="float-right">
                    <a onClick={() => this.editCommentOpen(comment.id)}><Edit size={20}></Edit></a>
                    <a onClick={() => this.deleteComment(comment.id)}><Trash size={20}></Trash></a>
                  </span>
                </p></div>
                <div><p className="float-right"><User size={20} />  {comment.author}</p></div>
                <div><p className="float-right">Posted on {getSocialDate(new Date(comment.timestamp))}</p></div>
              </Col>
              </Row>
          </Well>
        ))}
        <AddEditComment 
          showAddComment={this.state.showAddComment} 
          onCloseComment={() => this.addCommentClose()}
          type={this.state.commentModalType} />
      </div>
    )
  }
}

function mapStateToProps ({ comments }) {
  return {
    comments: comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openAddComment: (comment) => dispatch(openAddComment(comment)),
    openEditComment: (comment) => dispatch(openEditComment(comment)),
    deleteComment: (id) => dispatch(deleteComment(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))