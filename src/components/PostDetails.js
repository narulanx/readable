import React from 'react'
import { capitalize, getSocialDate } from '../utils/helpers'
import { Panel, Row, Col, Grid } from 'react-bootstrap'
import ArrowUp from 'react-icons/lib/fa/angle-up'
import ArrowDown from 'react-icons/lib/fa/angle-down'
import User from 'react-icons/lib/fa/user'
import Edit from 'react-icons/lib/fa/edit'
import Trash from 'react-icons/lib/fa/trash-o'
import Comments from './Comments'
import { openEditPost, deletePost } from '../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AddPost from './AddPost'
import * as ReadableAPI from '../utils/ReadableAPI'

class PostDetails extends React.Component {
  state = {
    showAddPost: false
  }

  editPostOpen = function() {
    const {id, title, category, body, author} = this.props.selectedPost
    this.props.openEditPost({ id, title, category, body, author })
    this.setState({ showAddPost: true })
  }

  deletePost = function() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const { id } = this.props.selectedPost
      ReadableAPI.deletePost(id).then(() => {
        this.props.deletePost(id)
        this.props.history.push('/')
      })
    }
  }

  render() {
    const { categories, selectedPost } = this.props
    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <Panel header={selectedPost.title} bsStyle="primary" className="post">
              <Row className="show-grid">
                <Col xs={1} className="column-flex">
                  <ArrowUp size={30}></ArrowUp>
                  <span className="vote">{selectedPost.voteScore}</span>
                  <ArrowDown size={30}></ArrowDown>
                </Col>
                <Col xs={11} className="column-flex">
                  <div>
                    <p>
                      <span className="float-left">{selectedPost.body}</span>
                      <span className="float-right">
                        <a onClick={() => this.editPostOpen()}><Edit size={20}></Edit></a>
                        <a onClick={() => this.deletePost()}><Trash size={20}></Trash></a>
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
        <AddPost 
          showAddPost={this.state.showAddPost}
          categories={categories}
          addPostClose={() => this.setState({ showAddPost: false })}
          type="edit"
        />
      </Grid>
    )
  }
}

function mapStateToProps ({ categories, selectedPost }) {
  return {
    categories: categories,
    selectedPost: selectedPost
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openEditPost: (post) => dispatch(openEditPost(post)),
    deletePost: (id) => dispatch(deletePost(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))