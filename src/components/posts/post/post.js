import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Post extends Component {
    render() {
        return (
            <div>
                <p><Link to={`/posts/${this.props.post.id}/comments`}>{this.props.post.title}</Link></p>
                <p>{this.props.post.body}</p>
            </div>
        );
    }
}

// set withRouter to get access to the properties of router
export default withRouter(Post);