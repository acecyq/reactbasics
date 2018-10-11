import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Post from './post/post';
import Spinner from '../../ui/spinner/spinner';
import { NavLink } from 'react-router-dom';

export default class extends Component {
    state = {
        data : null
    }

    componentDidMount() {

        // get search params from this.props.location.search to find the index
        // send get request to url for all the posts by user id of index
        let { location } = this.props;
        let index = location.search.slice(6);
        axios.get('posts?userId=' + index)
            .then(res => {
                this.setState({ data : res.data });
            })
            .catch(err => console.log(err));
    }

    render() {
        const data = this.state.data ?
            this.state.data.map(post => {
                return <Post key={post.id} post={post} />
            }) :
            <Spinner />;

        return (
            <Fragment>
                {data}
                <NavLink to="/">Back to Users</NavLink>
            </Fragment>        
        )
    }
}