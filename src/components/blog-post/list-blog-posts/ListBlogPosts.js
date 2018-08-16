import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Button, Form, FormGroup, Label, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {formatDate} from '../../../utils';
import Loading from '../../common/Loading';

export default class ListBlogPosts extends Component {
  static propTypes = {
    blogPosts: PropTypes.array,
    getBlogPosts: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getBlogPosts();
  }

  render() {
    if (!this.props.blogPosts) {
      return <Loading/>;
    }

    return (
        <div className="container-fluid">
      <Row>
        <Col>
          <ListGroup>
            <ListGroupItem>
              <Link className="btn btn-outline-info" to="/blogPost/search">Search Blog Posts</Link>
            </ListGroupItem>
            {this.props.blogPosts.map((blogPost, k) => {
              return <ListGroupItem key={k}>
                <strong>{blogPost.title}</strong>
                <span className="float-right">
                  <span className="mr-2">{formatDate(blogPost.created)}</span>
                  <Link to={`/blogPost/${blogPost.id}`} className="btn btn-primary"><i className="fa fa-arrow-right"/></Link>
                </span>
              </ListGroupItem>
            })}
          </ListGroup>
        </Col>
      </Row>
    </div>
    );
  }
}