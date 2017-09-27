# Readable

This is a Readable project with content and comment web app. Users are able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Usres are also able to edit and delete posts and comments.

This content and comment structure is common across a large number of websites and applications, from news sites to blogs to aggregators like Hacker News and Reddit. The intention of this project was to understand how Redux can function in a standard type of application.

## Installation

- Download/Clone the repository from github
- Running the Server
  * Open a terminal and navigate to the folder api-server. 
  * Install all the dependencies by running the command `npm install`
  * The server will start running in the port 3001
- Running the FrontEnd Application
  * Open a new terminal and navigate to the 'readable' folder
  * Install all the dependencies by running the command `npm install`
  * The application will start running in the port 3000
  * The browser with the localhost URL will open on its own
  * Now you can play with the application and enjoy its features

## Specifications

### Server

The server is built in Node, and is very simple. The front end code talks to the server using [documented API endpoints]('https://github.com/udacity/reactnd-project-readable-starter/tree/master/api-server'). The server's endpoints are used to manage storing, reading, updating, and deleting data for the application. Using this server, I built a React/Redux front end for the application, the specifications of which are mentioned below.

### Data

There are three types of objects stored on the server:

- Categories
- Posts
- Comments

### Categories

The server supports a small, fixed number of categories that users can put posts into. Categories are simple objects containing a name and a URL path (usually the same string).

### Posts

Posts are the building blocks of the application. Posts include:
- id (Unique Identifier)
- timestamp (Time created)
- title (Post title)
- body (Comment body)
- author (Comment author)
- category (One of the categories provided by the server)
- voteScore (Net votes the comment has received; default: 1)
- deleted (Flag if comment has been 'deleted)

### Comments

Comments are attached to parent posts. They include:
- id (Unique Identifier)
- parentId (id of the parent post)
- timestamp (Time created)
- body (Comment body)
- author (Comment author)
- voteScore (Net votes the comment has received; default: 1)
- deleted (Flag if comment has been 'deleted)
- parentDeleted (Flag for when the parent post was deleted)

### Views

The application has four views:
- Default (Root)
  * Lists all available categories, which links to a category view for that category
  * Lists all of the posts ordered by voteScore (highest score first)
  * Has a control for changing the sort method for the list ordered by voteScore and timestamp
  * Has a control for adding a new post

- Category View
  * Identical to the default view, but filtered to only include posts with the selected category

- Post Detail View
  * Shows the details of a post, including: Title, Body, Author, timestamp, and vote score
  * Lists all of the comments for that post, ordered by voteScore (highest first)
  * Has controls to edit or delete the post
  * Has a control to add a new comment
  * Implements comment form in a modal format
  * Comments have controls for editing and deleting

- Create/Edit View
  * Has a form to create new post or edit existing posts
  * When editing, existing data is populated in the form

## Tools and Dependencies

The project uses React to build the application UI, and is created using create-react-app to bootstrap the project.

The project uses Redux to maange the application state. This includes all user actions and responses from the API server. Component state is used to handle form input fields and controlled components. Otherwise, the rest of the state for the application is controlled by reducers.

The project uses CSS Bootstrap framework for the look and feel of the UI, Modals, Wells and form input fields.

Below are the dependencies used in the project -
- "react": "^15.6.1",
- "react-bootstrap": "^0.31.3",
- "react-dom": "^15.6.1",
- "react-dropdown": "^1.3.0",
- "react-icons": "^2.2.5",
- "react-router-dom": "^4.2.2",
- "react-scripts": "1.0.13",
- "react-select": "^1.0.0-rc.7"`