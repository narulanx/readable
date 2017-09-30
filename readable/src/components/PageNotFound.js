import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-bootstrap'

class PageNotFound extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <div><p>The page you are trying to access is not available. Click Home in the navbar to see the list of all the posts.</p></div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default PageNotFound
