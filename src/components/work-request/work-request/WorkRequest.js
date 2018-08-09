import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Loading from '../../common/Loading';

export default class WorkRequest extends PureComponent {
  static propTypes = {
    getWorkRequest: PropTypes.func.isRequired,
    workRequests: PropTypes.array,
    currentWorkRequest: PropTypes.object,
    match: PropTypes.object.isRequired, //router,
    history: PropTypes.object.isRequired, //router
  };

  componentDidMount = () => {
    const {getWorkRequest, match} = this.props;
    getWorkRequest(match.params.lid);
  };

  render() {
    const {match, currentWorkRequest} = this.props;

    if (!currentWorkRequest || String(currentWorkRequest.id) !== match.params.lid) {
      return <Loading/>
    }

    return (
      <div>
        <h3>Title</h3>
        <p>{currentWorkRequest.title}</p>
        <h3>Description</h3>
        <p>{currentWorkRequest.description}</p>
        <h3>Created</h3>
        <p>{currentWorkRequest.created}</p>
        <h3>Modified</h3>
        <p>{currentWorkRequest.modified}</p>
        <h3>Owner</h3>
        <p>{currentWorkRequest.owner}</p>
      </div>
    )
  }
}