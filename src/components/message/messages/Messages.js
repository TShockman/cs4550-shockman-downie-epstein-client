import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Loading from '../../common/Loading';

export default class Messages extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    draftMessage: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.props.getProfile();
  };

  getInbox() {
    const {user, deleteMessage} = this.props;

    const nonDeletedMessages = user.receivedMessages.filter(message => !message.recipientDeleted);
    if (!nonDeletedMessages.length) {
      return <ListGroupItem>Inbox empty.</ListGroupItem>;
    }

    return nonDeletedMessages.map(message => {
      return (
      <ListGroupItem key={message.id}>
        {message.subject}
        <span className="float-right">
          <Link to={`/profile/message/${message.id}`} className="btn btn-primary"><i className="fa fa-arrow-right"/></Link>
          <Button color="danger" onClick={() => deleteMessage(message.id)}><i className="fa fa-trash"/></Button>
        </span>
      </ListGroupItem>
      );
    });
  }

  getOutbox() {
    const {user, deleteMessage} = this.props;

    const nonDeletedMessages = user.sentMessages.filter(message => !message.senderDeleted);
    if (!nonDeletedMessages.length) {
      return <ListGroupItem>Outbox empty.</ListGroupItem>;
    }

    return nonDeletedMessages.map(message => {
      return (
        <ListGroupItem key={message.id}>
          {message.subject}
          <span className="float-right">
          <Link to={`/profile/message/${message.id}`} className="btn btn-primary"><i className="fa fa-arrow-right"/></Link>
          <Button color="danger" onClick={() => deleteMessage(message.id)}><i className="fa fa-trash"/></Button>
        </span>
        </ListGroupItem>
      );
    });
  }

  startDraft = () => {
    const {draftMessage} = this.props;
    draftMessage();
  };

  render() {
    const {user} = this.props;
    if (!user) {
      return <Loading/>;
    }

    return (
      <div className="container-fluid">
        <Row>
          <Col>
            <Button onClick={this.startDraft} className="btn btn-primary">New Message</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Inbox</h2>
            <ListGroup>
              {this.getInbox()}
            </ListGroup>
          </Col>
          <Col>
            <h2>Outbox</h2>
            <ListGroup>
              {this.getOutbox()}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}