import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {Link} from 'react-router-dom';
import Loading from '../../common/Loading';

export default class UpdateListing extends Component {
  static propTypes = {
    getListing: PropTypes.func.isRequired,
    updateListing: PropTypes.func.isRequired,
    currentListing: PropTypes.object,
    match: PropTypes.object.isRequired, //router
  };

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      rate: '',
      imageSrcs: ''
    };
  }

  setStateFromCurrentListing = () => {
    const {title, description, rate, imageSrcs} = this.props.currentListing;
    this.setState({title, description, rate, imageSrcs});
  };

  componentDidMount = () => {
    const {getListing, match, currentListing} = this.props;
    getListing(match.params.lid);
    if (currentListing) {
      this.setStateFromCurrentListing();
    }
  };

  componentDidUpdate = oldProps => {
    const {currentListing, match} = this.props;
    if (!oldProps.currentListing && currentListing) {
      this.setStateFromCurrentListing();
    } else if (currentListing && currentListing.id !== oldProps.currentListing.id) {
      this.setStateFromCurrentListing();
    }

    if (match.params.lid !== oldProps.match.params.lid) {
      this.props.getListing(match.params.lid);
    }
  };

  handleFormUpdate = event => {
    event.stopPropagation();
    const {target} = event;
    this.setState({[target.id]: target.value});
  };

  handleSubmit = event => {
    event.stopPropagation();
    const {title, description, rate, imageSrcs} = this.state;
    let {currentListing, updateListing} = this.props;
    currentListing = {...currentListing, title, description, rate, imageSrcs};
    updateListing(currentListing);
  };

  render() {
    const {currentListing} = this.props;
    if (!currentListing) {
      return <Loading/>;
    }

    return (
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input onChange={this.handleFormUpdate} id="title" name="title" placeholder="Custom Embroidery" value={this.state.title}/>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input onChange={this.handleFormUpdate} id="description" name="description" type="textarea" placeholder="I make custom embroidered shoelaces!" value={this.state.description}/>
        </FormGroup>
        <FormGroup>
          <Label for="rate">Rate</Label>
          <Input onChange={this.handleFormUpdate} id="rate" name="rate" placeholder="$30/pair" value={this.state.rate}/>
        </FormGroup>
        <FormGroup>
          <Label for="imageSrcs">Image Sources</Label>
          <Input onChange={this.handleFormUpdate} id="imageSrcs" name="imageSrcs" type="textarea" value={this.state.imageSrcs}/>
          <FormText>One image source URL per line.</FormText>
        </FormGroup>
        <Link className="btn btn-secondary" to={`/listing/${currentListing.id}`}>Cancel</Link>
        <Button className="btn btn-success" onClick={this.handleSubmit}>Update</Button>
      </Form>
    );
  }
}