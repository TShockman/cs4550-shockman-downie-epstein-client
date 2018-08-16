import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loading from '../../common/Loading';
import {Row, Col, ListGroup, ListGroupItem, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {formatDate} from '../../../utils';

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
    draftMessage: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    deleteBlogPost: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      comment: ''
    }
  }

  componentDidMount = () => {
    const {getBlogPost, match, getProfile} = this.props;
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
        <Link to={`/user/${c.owner.id}`}><strong>{c.owner.username}</strong></Link>: {c.comment} {deleteButton}
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
      <ListGroup className="list-group-item-action">
        {srcs.map((src, k) => <ListGroupItem className="list-group-item-action" key={k}><img src={src}/></ListGroupItem>)}
      </ListGroup>
    )
  };

  handleDelete = () => {
    const {deleteBlogPost, currentBlogPost, history} = this.props;
    deleteBlogPost(currentBlogPost.id);
    history.push('/');
  };

  render() {
    const {match, currentBlogPost, user, deleteBlogPost} = this.props;

    if (!currentBlogPost || String(currentBlogPost.id) !== match.params.bpid) {
      return <Loading/>
    }

    console.log('USER', user, 'BLOG PSOT', currentBlogPost)
    return (
      <div className="container-fluid">
        <Row>
          <Col>
            <h3>Title</h3>
            <p>{currentBlogPost.title}</p>
            <h3>Description</h3>
            <p>{currentBlogPost.description}</p>
            {this.getImages()}
            <h3>Created</h3>
            <p>{formatDate(currentBlogPost.created)}</p>
            <h3>Modified</h3>
            <p>{formatDate(currentBlogPost.modified)}</p>
            <h3>Owner</h3>
            <p><Link to={`/user/${currentBlogPost.owner.id}`}>{currentBlogPost.owner.username}</Link></p>
            {user && <Button className="btn btn-info" onClick={this.handleMessage}>Message Owner About This Blog Post</Button>}
            {user
              && (user.id === currentBlogPost.owner.id || user.role === 'ADMIN')
              && <Button onClick={this.handleDelete} color="danger">Delete</Button>}
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup className="list-group-item-action">
              {currentBlogPost.comments.map(this.getCommentItem)}
              {user ?
                <ListGroupItem className="list-group-item-action">
                  <Input onChange={this.handleChange} type="textarea" placeholder="Wow! Cool!" value={this.state.comment}/>
                  <Button className="btn btn-primary" onClick={this.handleComment}>Comment</Button>
                </ListGroupItem> :
                <ListGroupItem className="list-group-item-action">Please <Link to="/login">login</Link> to comment.</ListGroupItem>
              }
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }
}