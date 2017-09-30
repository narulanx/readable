import React from 'react'
import { capitalize, getSocialDate } from '../utils/helpers'
import { Panel, Row, Col, Grid } from 'react-bootstrap'
import ArrowUp from 'react-icons/lib/fa/angle-up'
import ArrowDown from 'react-icons/lib/fa/angle-down'
import User from 'react-icons/lib/fa/user'
import Edit from 'react-icons/lib/fa/edit'
import Trash from 'react-icons/lib/fa/trash-o'
import Comments from './Comments'
import PageNotFound from './PageNotFound'
import * as PostActions from '../actions/PostActions'
import { loadComments } from '../actions/CommentActions'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import * as ReadableAPI from '../utils/ReadableAPI'

class PostDetails extends React.Component {
  state = {
    showAddPost: false
  }

  componentDidMount() {
    ReadableAPI.getPostDetails(this.props.postId).then((data) => {
      if(!data.error) {
        this.props.selectPost(data) 
      }
    })
    ReadableAPI.getComments(this.props.postId).then((data) => {
      this.props.loadComments(data) 
    })
  }

  deletePost = function() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const { id } = this.props.selectedPost
      this.props.deleteApiPost(id)
    }
  }

  updateVoteScore = function(e, id, option) {
    e.preventDefault()
    this.props.updateApiPostVote(id, option)
  }

  render() {
    const { selectedPost } = this.props
    return(
      Object.keys(selectedPost).length === 0 ?
      <PageNotFound /> :
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <Panel header={selectedPost.title} bsStyle="primary" className="post">
              <Row className="show-grid">
                <Col xs={1} className="column-flex">
                  <Link to='' onClick={(e) => this.updateVoteScore(e, selectedPost.id, 'upVote')}>
                    <ArrowUp size={30}></ArrowUp>
                  </Link>
                  <span className="vote">{selectedPost.voteScore}</span>
                  <Link to='' onClick={(e) => this.updateVoteScore(e, selectedPost.id, 'downVote')}>
                    <ArrowDown size={30}></ArrowDown>
                  </Link>
                </Col>
                <Col xs={11} className="column-flex">
                  <div>
                    <p>
                      <span className="float-left">{selectedPost.body}</span>
                      <span className="float-right">
                        <Link to={`/post/${selectedPost.id}/edit`}><Edit size={20}></Edit></Link>
                        <Link to='' onClick={() => this.deletePost()}><Trash size={20}></Trash></Link>
                      </span>
                    </p>
                  </div>
                  <div><p className="float-right"><User size={20} />  {selectedPost.author}</p></div>
                  <div>
                    <p className="float-left"><em>{capitalize(selectedPost.category)}</em></p>
                    <p className="float-right">Posted on {getSocialDate(new Date(selectedPost.timestamp))}</p>
                  </div>
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
        <Comments />
      </Grid>
    )
  }
}

function mapStateToProps ({ selectedPost }) {
  return {
    selectedPost
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deleteApiPost: (id) => dispatch(PostActions.deleteApiPost(id)),
    selectPost: (selectedPost) => dispatch(PostActions.selectPost(selectedPost)),
    loadComments: (comments) => dispatch(loadComments(comments)),
    updateApiPostVote: (id, option) => dispatch(PostActions.updateApiPostVote(id, option))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))