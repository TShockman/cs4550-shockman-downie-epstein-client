import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Loading from '../../common/Loading';
import {Row, Col, ListGroup, ListGroupItem, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class WorkRequest extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    getWorkRequest: PropTypes.func.isRequired,
    workRequests: PropTypes.array,
    currentWorkRequest: PropTypes.object,
    match: PropTypes.object.isRequired, //router,
    history: PropTypes.object.isRequired, //router
    createComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      comment: ''
    }
  }
  
  componentDidMount = () => {
    const {getWorkRequest, match} = this.props;
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
        <strong>{c.owner.username}</strong>: {c.comment} {deleteButton}
      </ListGroupItem>
    )
  };

  render() {
    const {match, currentWorkRequest, user} = this.props;

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
            <h3>Created</h3>
            <p>{currentWorkRequest.created}</p>
            <h3>Modified</h3>
            <p>{currentWorkRequest.modified}</p>
            <h3>Owner</h3>
            <p>{currentWorkRequest.owner}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {currentWorkRequest.comments.map(this.getCommentItem)}
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