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

class Comments extends React.Component {
  render() {
    const { comments } = this.props
    console.log(comments)
    return(
      <div>
        <h4>Comments ({ comments.length })</h4>
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
                  <span className="float-right"><Edit size={20}></Edit><Trash size={20}></Trash></span>
                </p></div>
                <div><p className="float-right"><User size={20} />  {comment.author}</p></div>
                <div><p className="float-right">Posted on {getSocialDate(new Date(comment.timestamp))}</p></div>
              </Col>
              </Row>
          </Well>
        ))}
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
    
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))