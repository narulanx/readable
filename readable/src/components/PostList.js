import React from 'react'
import { Row, Col, Well } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { capitalize, getSocialDate } from '../utils/helpers'
import ArrowUp from 'react-icons/lib/fa/angle-up'
import ArrowDown from 'react-icons/lib/fa/angle-down'
import User from 'react-icons/lib/fa/user'
import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import { updatePostVote } from '../actions'

class PostList extends React.Component {
  sortPost = function(post, sortMethod) {
    if (sortMethod === 'votescore') {
      post.sort(function(a, b) {
        return a.voteScore < b.voteScore
      })
    } else if (sortMethod === 'timestamp') {
      post.sort(function(a, b) {
        return a.timestamp < b.timestamp
      })
    }
  }

  updateVoteScore = function(e, id, option) {
    e.preventDefault()
    ReadableAPI.updatePostVote(id, option).then(() => {
      this.props.updatePostVote(id, option)
    })
  }

  render() {
    let { post, sortMethod } = this.props
    this.sortPost(post, sortMethod)
    return (
      <div>
        { post.map((p) => (
        <Well key={p.id} bsSize="large">
        <Row className="show-grid">
          <Col xs={1}>
            <Link to='' onClick={(e) => this.updateVoteScore(e, p.id, 'upVote')}>
              <ArrowUp size={30}></ArrowUp>
            </Link>
            <span className="vote">{p.voteScore}</span>
            <Link to='' onClick={(e) => this.updateVoteScore(e, p.id, 'downVote')}>
              <ArrowDown size={30}></ArrowDown>
            </Link>
          </Col>
          <Col xs={11} className="column-flex">
            <div><Link id={p.id} 
              className="float-left" 
              to={`/post/${p.id}`}>{p.title}</Link></div>
            <div><p className="float-left">{p.body}</p></div>
            <div><p className="float-right"><User size={20} />  {p.author}</p></div>
            <div>
              <p className="float-left"><em>{capitalize(p.category)}</em></p>
              <p className="float-right">Posted on {getSocialDate(new Date(p.timestamp))}</p>
            </div>
          </Col>
        </Row>
        </Well>
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ post }) {
  return {
    post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePostVote: (id, option) => dispatch(updatePostVote(id, option))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList))