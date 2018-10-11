import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Comment from './comment/comment';
import Spinner from '../../ui/spinner/spinner';
import { Link } from 'react-router-dom';

export default class extends Component {
    state = {
        data : null
    }

    componentDidMount() {

        // get index from this.props.match.params
        // send get request for the comments pertaining to the post with id of index
        axios.get(`/posts/${this.props.match.params.id}/comments`)
            .then(res => {
                this.setState({ data : res.data })
            })
            .catch(err => err);
    }

    render() {
        const data = this.state.data ?
            this.state.data.map(comment => {
                return (
                    <Comment key={comment.name} {...comment} />
                )
            }) :
            <Spinner />;

        return (
            <Fragment>
                {data}
                <Link to="/">Back to Users</Link>
            </Fragment>
        );
    }
}
    
