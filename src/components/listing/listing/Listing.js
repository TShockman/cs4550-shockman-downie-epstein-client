import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loading from '../../common/Loading';
import {Row, Col, ListGroup, ListGroupItem, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {formatDate} from '../../../utils';

export default class Listing extends Component {
  static propTypes = {
    user: PropTypes.object,
    getListing: PropTypes.func.isRequired,
    listings: PropTypes.array,
    currentListing: PropTypes.object,
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
    const {getListing, match} = this.props;
    getListing(match.params.lid);
  };

  handleChange = event => {
    this.setState({comment: event.target.value});
  };

  handleComment = () => {
    const {currentListing, createComment} = this.props;
    const comment = {
      comment: this.state.comment
    };
    createComment(comment, currentListing.id);
    this.setState({comment: ''});
  };

  getCommentItem = c => {
    const {user, deleteComment, currentListing} = this.props;
    const deleteButton = user && (user.role === 'ADMIN' || user.id === c.owner.id)
      ? <Button className="float-right" onClick={() => deleteComment(c.id, currentListing.id)} color="danger">
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
    const {draftMessage, currentListing} = this.props;
    const to = currentListing.owner.username;
    const message = {
      subject: currentListing.title,
      body: ''
    };
    draftMessage(to, message);
  };

  getImages = () => {
    const {currentListing} = this.props;
    const srcs = currentListing.imageSrcs ? currentListing.imageSrcs.split('\n') : [];
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
    const {match, currentListing, user} = this.props;

    if (!currentListing || String(currentListing.id) !== match.params.lid) {
      return <Loading/>
    }

    return (
      <div>
        <Row>
          <Col>
            <h3>Title</h3>
            <p>{currentListing.title}</p>
            <h3>Description</h3>
            <p>{currentListing.description}</p>
            <h3>Rate</h3>
            <p>{currentListing.rate}</p>
            {this.getImages()}
            <h3>Created</h3>
            <p>{formatDate(currentListing.created)}</p>
            <h3>Modified</h3>
            <p>{formatDate(currentListing.modified)}</p>
            <h3>Owner</h3>
            <p><Link to={`/user/${currentListing.owner.id}`}>{currentListing.owner.username}</Link></p>
            <Button onClick={this.handleMessage}>Message Owner About This Listing</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {currentListing.comments.map(this.getCommentItem)}
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