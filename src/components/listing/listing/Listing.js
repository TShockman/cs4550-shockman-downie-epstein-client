import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Loading from '../../common/Loading';

export default class Listing extends PureComponent {
  static propTypes = {
    getListing: PropTypes.func.isRequired,
    listings: PropTypes.array,
    currentListing: PropTypes.object,
    match: PropTypes.object.isRequired, //router,
    history: PropTypes.object.isRequired, //router
  };

  componentDidMount = () => {
    const {getListing, match} = this.props;
    getListing(match.params.lid);
  };

  render() {
    const {match, currentListing} = this.props;

    if (!currentListing || String(currentListing.id) !== match.params.lid) {
      return <Loading/>
    }

    return (
      <div>
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
      </div>
    )
  }
}