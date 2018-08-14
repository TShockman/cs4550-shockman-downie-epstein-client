import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {Link} from 'react-router-dom';
import Loading from '../../common/Loading';

export default class UpdateBlogPost extends Component {
  static propTypes = {
    getBlogPost: PropTypes.func.isRequired,
    updateBlogPost: PropTypes.func.isRequired,
    currentBlogPost: PropTypes.object,
    match: PropTypes.object.isRequired, //router
  };

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      imageSrcs: ''
    };
  }

  setStateFromCurrentBlogPost = () => {
    const {title, description, imageSrcs} = this.props.currentBlogPost;
    this.setState({title, description, imageSrcs});
  };

  componentDidMount = () => {
    const {getBlogPost, match, currentBlogPost} = this.props;
    getBlogPost(match.params.bpid);
    if (currentBlogPost) {
      this.setStateFromCurrentBlogPost();
    }
  };

  componentDidUpdate = oldProps => {
    const {currentBlogPost, match} = this.props;
    if (!oldProps.currentBlogPost && currentBlogPost) {
      this.setStateFromCurrentBlogPost();
    } else if (currentBlogPost && currentBlogPost.id !== oldProps.currentBlogPost.id) {
      this.setStateFromCurrentBlogPost();
    }

    if (match.params.bpid !== oldProps.match.params.bpid) {
      this.props.getBlogPost(match.params.bpid);
    }
  };

  handleFormUpdate = event => {
    event.stopPropagation();
    const {target} = event;
    this.setState({[target.id]: target.value});
  };

  handleSubmit = event => {
    event.stopPropagation();
    const {title, description, imageSrcs} = this.state;
    let {currentBlogPost, updateBlogPost} = this.props;
    currentBlogPost = {...currentBlogPost, title, description, imageSrcs};
    updateBlogPost(currentBlogPost);
  };

  render() {
    const {currentBlogPost} = this.props;
    if (!currentBlogPost) {
      return <Loading/>;
    }

    return (
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input onChange={this.handleFormUpdate} value={this.state.title} id="title" name="title" placeholder="Announcement!"/>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input onChange={this.handleFormUpdate} value={this.state.description} id="description" name="description" type="textarea" placeholder="Today we are launching a new feature!"/>
        </FormGroup>
        <FormGroup>
          <Label for="imageSrcs">Image Sources</Label>
          <Input onChange={this.handleFormUpdate} value={this.state.imageSrcs} id="imageSrcs" name="imageSrcs" type="textarea"/>
          <FormText>One image source URL per line.</FormText>
        </FormGroup>
        <Link className="btn btn-secondary" to={`/blogPost/${currentBlogPost.id}`}>Cancel</Link>
        <Button className="btn btn-success" onClick={this.handleSubmit}>Update</Button>
      </Form>
    );
  }
}