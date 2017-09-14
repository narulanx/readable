import React from 'react'
import { Button, Modal, FormGroup, FormControl} from 'react-bootstrap';

export default function AddPost ({ showAddPost, addPostClose }) {
  return (
    <Modal show={showAddPost} onHide={() => addPostClose()}>
      <Modal.Header closeButton>
      <Modal.Title>Add Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form>
        <FormGroup
          controlId="postTitle" 
        >
        <FormControl
          type="text"
          placeholder="Title"
        />
        </FormGroup>
        <FormGroup
          controlId="postBody" 
        >
        <FormControl
          type="text"
          placeholder="Post"
        />
        </FormGroup>
        <FormGroup
          controlId="postAuthor" 
        >
        <FormControl
          type="text"
          placeholder="Author"
        />
        </FormGroup>
      </form>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={() => addPostClose()}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}