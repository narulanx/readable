import React, { Component } from 'react'
import { openAddPost } from '../actions'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

class Header extends Component {
  addPostOpen = function() {
    this.props.openAddPost()
    this.props.history.push(`/newPost`)
  }

  render() {
    
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" onClick={(category) => this.props.getAllPosts()}>Readable</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/"><NavItem eventKey={1} onClick={(category) => this.getAllPosts()}>Home</NavItem></LinkContainer>
          <NavItem eventKey={2} onClick={() => this.addPostOpen()}>Add Post</NavItem>
        </Nav>
    </Navbar>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openAddPost: () => dispatch(openAddPost())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Header))
