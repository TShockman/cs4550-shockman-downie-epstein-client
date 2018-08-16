import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loading from '../../common/Loading';
import {Row, Col, ListGroup, ListGroupItem, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {formatDate} from '../../../utils';

export default class WorkRequest extends Component {
  static propTypes = {
    user: PropTypes.object,
    getWorkRequest: PropTypes.func.isRequired,
    workRequests: PropTypes.array,
    currentWorkRequest: PropTypes.object,
    match: PropTypes.object.isRequired, //router,
    history: PropTypes.object.isRequired, //router
    createComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    draftMessage: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    deleteWorkRequest: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      comment: ''
    }
  }
  
  componentDidMount = () => {
    const {getWorkRequest, match, getProfile} = this.props;
    getWorkRequest(match.params.wrid);
  };

  handleChange = event => {
    this.setState({comment: event.target.value});
  };

  handleComment = () => {
    const {currentWorkRequest, createComment} = this.props;
    const comment = {
      comment: this.state.comment
    };
    createComment(comment, currentWorkRequest.id);
    this.setState({comment: ''});
  };

  getCommentItem = c => {
    const {user, deleteComment, currentWorkRequest} = this.props;
    const deleteButton = user && (user.role === 'ADMIN' || user.id === c.owner.id)
      ? <Button className="float-right" onClick={() => deleteComment(c.id, currentWorkRequest.id)} color="danger">
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
    const {draftMessage, currentWorkRequest} = this.props;
    const to = currentWorkRequest.owner.username;
    const message = {
      subject: currentWorkRequest.title,
      body: ''
    };
    draftMessage(to, message);
  };

  getImages = () => {
    const {currentWorkRequest} = this.props;
    const srcs = currentWorkRequest.imageSrcs ? currentWorkRequest.imageSrcs.split('\n') : [];
    if (srcs.length === 0) {
      return null;
    }
    return (
      <ListGroup>
        {srcs.map((src, k) => <ListGroupItem key={k}><img src={src}/></ListGroupItem>)}
      </ListGroup>
    )
  };

  handleDelete = () => {
    const {deleteWorkRequest, currentWorkRequest, history} = this.props;
    deleteWorkRequest(currentWorkRequest.id);
    history.push('/');
  };

  render() {
    const {match, currentWorkRequest, user, deleteWorkRequest} = this.props;

    if (!currentWorkRequest || String(currentWorkRequest.id) !== match.params.wrid) {
      return <Loading/>
    }

    return (
      <div>
        <Row>
          <Col>
            <h3>Title</h3>
            <p>{currentWorkRequest.title}</p>
            <h3>Description</h3>
            <p>{currentWorkRequest.description}</p>
            <h3>Compensation</h3>
            <p>{currentWorkRequest.compensation}</p>
            {this.getImages()}
            <h3>Created</h3>
            <p>{formatDate(currentWorkRequest.created)}</p>
            <h3>Modified</h3>
            <p>{formatDate(currentWorkRequest.modified)}</p>
            <h3>Owner</h3>
            <p><Link to={`/user/${currentWorkRequest.owner.id}`}>{currentWorkRequest.owner.username}</Link></p>
            {user && <Button onClick={this.handleMessage}>Message Owner About This Work Request</Button>}
            {user
              && (user.id === currentWorkRequest.owner.id || user.role === 'ADMIN')
              && <Button onClick={this.handleDelete} color="danger">Delete</Button>}
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {currentWorkRequest.comments.map(this.getCommentItem)}
              {user ?
                <ListGroupItem>
                  <Input onChange={this.handleChange} type="textarea" placeholder="Wow! Cool!" value={this.state.comment}/>
                  <Button className="btn btn-info" onClick={this.handleComment}>Comment</Button>
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