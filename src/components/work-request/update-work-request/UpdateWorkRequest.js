import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {Link} from 'react-router-dom';
import Loading from '../../common/Loading';

export default class UpdateWorkRequest extends Component {
  static propTypes = {
    getWorkRequest: PropTypes.func.isRequired,
    updateWorkRequest: PropTypes.func.isRequired,
    currentWorkRequest: PropTypes.object,
    match: PropTypes.object.isRequired, //router
  };

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      compensation: '',
      imageSrcs: ''
    };
  }

  setStateFromCurrentWorkRequest = () => {
    const {title, description, compensation, imageSrcs} = this.props.currentWorkRequest;
    this.setState({title, description, compensation, imageSrcs});
  };

  componentDidMount = () => {
    const {getWorkRequest, match, currentWorkRequest} = this.props;
    getWorkRequest(match.params.wrid);
    if (currentWorkRequest) {
      this.setStateFromCurrentWorkRequest();
    }
  };

  componentDidUpdate = oldProps => {
    const {currentWorkRequest, match} = this.props;
    if (!oldProps.currentWorkRequest && currentWorkRequest) {
      this.setStateFromCurrentWorkRequest();
    } else if (currentWorkRequest && currentWorkRequest.id !== oldProps.currentWorkRequest.id) {
      this.setStateFromCurrentWorkRequest();
    }

    if (match.params.wrid !== oldProps.match.params.wrid) {
      this.props.getWorkRequest(match.params.wrid);
    }
  };

  handleFormUpdate = event => {
    event.stopPropagation();
    const {target} = event;
    this.setState({[target.id]: target.value});
  };

  handleSubmit = event => {
    event.stopPropagation();
    const {title, description, compensation, imageSrcs} = this.state;
    let {currentWorkRequest, updateWorkRequest} = this.props;
    currentWorkRequest = {...currentWorkRequest, title, description, compensation, imageSrcs};
    updateWorkRequest(currentWorkRequest);
  };

  render() {
    const {currentWorkRequest} = this.props;
    if (!currentWorkRequest) {
      return <Loading/>;
    }

    return (
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input onChange={this.handleFormUpdate} value={this.state.title} id="title" name="title" placeholder="Seeking Dog Nail Art Expert"/>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input onChange={this.handleFormUpdate} value={this.state.description} id="description" name="description" type="textarea" placeholder="I am looking for someone to paint the nails of my beloved German Shephard named Tootsie weekly."/>
        </FormGroup>
        <FormGroup>
          <Label for="compensation">Compensation</Label>
          <Input onChange={this.handleFormUpdate} value={this.state.compensation} id="compensation" name="compensation" placeholder="$100/hour"/>
        </FormGroup>
        <FormGroup>
          <Label for="imageSrcs">Image Sources</Label>
          <Input onChange={this.handleFormUpdate} value={this.state.imageSrcs} id="imageSrcs" name="imageSrcs" type="textarea"/>
          <FormText>One image source URL per line.</FormText>
        </FormGroup>
        <Link className="btn btn-secondary" to={`/workRequest/${currentWorkRequest.id}`}>Cancel</Link>
        <Button className="btn btn-success" onClick={this.handleSubmit}>Update</Button>
      </Form>
    );
  }
}