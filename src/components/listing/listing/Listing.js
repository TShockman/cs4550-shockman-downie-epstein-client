import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Loading from '../../common/Loading';
import {Row, Col, ListGroup, ListGroupItem, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class Listing extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    getListing: PropTypes.func.isRequired,
    listings: PropTypes.array,
    currentListing: PropTypes.object,
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
        <strong>{c.owner.username}</strong>: {c.comment} {deleteButton}
      </ListGroupItem>
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
            <h3>Created</h3>
            <p>{currentListing.created}</p>
            <h3>Modified</h3>
            <p>{currentListing.modified}</p>
            <h3>Owner</h3>
            <p>{currentListing.owner}</p>
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