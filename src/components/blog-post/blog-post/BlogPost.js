import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Loading from '../../common/Loading';

export default class BlogPost extends PureComponent {
  static propTypes = {
    getBlogPost: PropTypes.func.isRequired,
    blogPosts: PropTypes.array,
    currentBlogPost: PropTypes.object,
    match: PropTypes.object.isRequired, //router,
    history: PropTypes.object.isRequired, //router
  };

  componentDidMount = () => {
    const {getBlogPost, match} = this.props;
    getBlogPost(match.params.bpid);
  };

  render() {
    const {match, currentBlogPost} = this.props;

    if (!currentBlogPost || String(currentBlogPost.id) !== match.params.bpid) {
      return <Loading/>
    }

    return (
      <div>
        <h3>Title</h3>
        <p>{currentBlogPost.title}</p>
        <h3>Description</h3>
        <p>{currentBlogPost.description}</p>
        <h3>Created</h3>
        <p>{currentBlogPost.created}</p>
        <h3>Modified</h3>
        <p>{currentBlogPost.modified}</p>
        <h3>Owner</h3>
        <p>{currentBlogPost.owner}</p>
      </div>
    )
  }
}