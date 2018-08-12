import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loading from '../../common/Loading';
import {Row, Col, ListGroup, ListGroupItem, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class BlogPost extends Component {
  static propTypes = {
    user: PropTypes.object,
    getBlogPost: PropTypes.func.isRequired,
    blogPosts: PropTypes.array,
    currentBlogPost: PropTypes.object,
    match: PropTypes.object.isRequired, //router,
    history: PropTypes.object.isRequired, //router
    createComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    draftMessage: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      comment: ''
    }
  }

  componentDidMount = () => {
    const {getBlogPost, match} = this.props;
    getBlogPost(match.params.bpid);
  };

  handleChange = event => {
    this.setState({comment: event.target.value});
  };

  handleComment = () => {
    const {currentBlogPost, createComment} = this.props;
    const comment = {
      comment: this.state.comment
    };
    createComment(comment, currentBlogPost.id);
    this.setState({comment: ''});
  };

  getCommentItem = c => {
    const {user, deleteComment, currentBlogPost} = this.props;
    const deleteButton = user && (user.role === 'ADMIN' || user.id === c.owner.id)
      ? <Button className="float-right" onClick={() => deleteComment(c.id, currentBlogPost.id)} color="danger">
          <i className="fa fa-trash"/>
        </Button>
      : '';

    return (
      <ListGroupItem key={c.id}>
        <strong>{c.owner.username}</strong>: {c.comment} {deleteButton}
      </ListGroupItem>
    )
  };

  handleMessage = () => {
    const {draftMessage, currentBlogPost} = this.props;
    const to = currentBlogPost.owner.username;
    const message = {
      subject: currentBlogPost.title,
      body: ''
    };
    draftMessage(to, message);
  };

  getImages = () => {
    const {currentBlogPost} = this.props;
    const srcs = currentBlogPost.imageSrcs ? currentBlogPost.imageSrcs.split('\n') : [];
    if (srcs.length === 0) {
      return null;
    }
    return (
      <ListGroup>
        {srcs.map((src, k) => <ListGroupItem key={k}><img src={src}/></ListGroupItem>)}
      </ListGroup>
    )
  };

  render() {
    const {match, currentBlogPost, user} = this.props;

    if (!currentBlogPost || String(currentBlogPost.id) !== match.params.bpid) {
      return <Loading/>
    }

    return (
      <div>
        <Row>
          <Col>
            <h3>Title</h3>
            <p>{currentBlogPost.title}</p>
            <h3>Description</h3>
            <p>{currentBlogPost.description}</p>
            {this.getImages()}
            <h3>Created</h3>
            <p>{currentBlogPost.created}</p>
            <h3>Modified</h3>
            <p>{currentBlogPost.modified}</p>
            <h3>Owner</h3>
            <p>{currentBlogPost.owner.username}</p>
            <Button onClick={this.handleMessage}>Message Owner About This Blog Post</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {currentBlogPost.comments.map(this.getCommentItem)}
              {user ?
                <ListGroupItem>
                  <Input onChange={this.handleChange} type="textarea" placeholder="Wow! Cool!" value={this.state.comment}/>
                  <Button onClick={this.handleComment}>Comment</Button>
                </ListGroupItem> :
                <ListGroupItem>Please <Link to="/login">login</Link> to comment.</ListGroupItem>
              }
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }
}