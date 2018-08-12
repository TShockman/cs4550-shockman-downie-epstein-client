import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Loading from '../../common/Loading';

export default class Message extends Component {
  static propTypes = {
    message: PropTypes.object,
    getMessage: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired, //router
    draftMessage: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    const {getMessage, match} = this.props;
    getMessage(match.params['mid']);
  };

  componentDidUpdate = oldProps => {
    const {match} = this.props;
    if (match.params['mid'] !== oldProps.match.params['mid']) {
      this.props.getMessage(match.params['mid']);
    }
  };

  handleReply = () => {
    const {draftMessage, message} = this.props;
    const newMessage = {subject: `RE: ${message.subject}`, body: ''};
    const to = message.sender.username;
    draftMessage(to, newMessage);
  };

  render() {
    const {message} = this.props;

    if (!message) {
      return <Loading/>;
    }

    return (
      <Row>
        <Col>
          <p>
            <strong>From:</strong> {message.sender.username}
          </p>
          <p>
            <strong>To:</strong> {message.recipient.username}
          </p>
          <p>
            <strong>Subject:</strong> {message.subject}
          </p>
          <p>
            {message.body}
          </p>
          <Link to="/profile/message" className="btn btn-secondary">Messages</Link>
          <Button color="primary" onClick={this.handleReply}>Reply</Button>
        </Col>
      </Row>
    );
  }
}