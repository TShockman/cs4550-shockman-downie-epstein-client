import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap';

export default class NewMessage extends Component {
  static propTypes = {
    messageDraft: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      to: '',
      subject: '',
      body: ''
    };
  }

  componentDidMount = () => {
    const {to, subject, body} = this.props.messageDraft;
    this.setState({to, subject, body});
  };

  componentDidUpdate = newProps => {
    const newDraft = newProps.messageDraft;
    const {to, subject, body} = this.props.messageDraft;
    if (newDraft.to !== to || newDraft.subject !== subject || newDraft.body !== body) {
      this.setState({to, subject, body});
    }
  };

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSend = () => {
    const {sendMessage} = this.props;
    const {to, subject, body} = this.state;
    if (!to || !subject || !body) {
      return alert('Please make sure all fields are filled in.');
    }
    const message = {subject, body};
    sendMessage(to, message);
  };

  render() {
    return (
      <Row>
        <Col>
          <Form>
            <FormGroup>
              <Label for="to">To</Label>
              <Input onChange={this.handleChange} id="to" name="to" placeholder="username" value={this.state.to}/>
            </FormGroup>
            <FormGroup>
              <Label for="subject">Subject</Label>
              <Input onChange={this.handleChange} id="subject" name="subject" placeholder="Howdy!" value={this.state.subject}/>
            </FormGroup>
            <FormGroup>
              <Label for="body">Message Body</Label>
              <Input onChange={this.handleChange} id="body" name="body" placeholder="How goes it, partner?" value={this.state.body}/>
            </FormGroup>
          </Form>
          <Button onClick={this.handleSend} color="primary">Send Message</Button>
        </Col>
      </Row>
    );
  }
}