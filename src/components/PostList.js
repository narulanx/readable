import React from 'react'
import { Row, Col, Well } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { capitalize, getSocialDate } from '../utils/helpers'
import ArrowUp from 'react-icons/lib/fa/angle-up'
import ArrowDown from 'react-icons/lib/fa/angle-down'
import User from 'react-icons/lib/fa/user'
import { connect } from 'react-redux'

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

  render() {
    let { post, sortMethod } = this.props
    this.sortPost(post, sortMethod)
    return (
      <div>
        { post.map((p) => (
        <Well key={p.id} bsSize="large">
        <Row className="show-grid">
          <Col xs={1}>
            <ArrowUp size={30}></ArrowUp>
            <span className="vote">{p.voteScore}</span>
            <ArrowDown size={30}></ArrowDown>
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

export default withRouter(connect(mapStateToProps, null)(PostList))