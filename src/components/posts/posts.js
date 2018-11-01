import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Table from '../table/table';
import Spinner from '../../ui/spinner/spinner';
import Heading from '../../ui/heading/heading';
import Root from '../root/root';
import actionTypes from '../../store/Action';

class Posts extends Component {
    state = {
        data : null,
        criteria : null
    }

    headingClick = (att) => {
        this.setState({ criteria : att });
    }

    componentDidMount() {

        // get search params from this.props.location.search to find the index
        // send get request to url for all the posts by user id of index
        let { location } = this.props;
        let index = location.search.slice(6);
        axios.get('/posts?userId=' + index)
            .then(res => {
                this.props.getUser(res.data);
            })
            .catch(err => this.props.raiseError(err));
    }

    componentWillUnmount() {
        this.props.remUrl();
        console.log('COMPONENT UNMOUNTING!!!');
        axios.get('/', {
            data: `cancel ${this.props.location.pathname.split('/')[1]}`
        })
            .then(res => {
                console.log('REMOVE CANCEL TOKEN FOR POSTS!!!');
            });
    }

    render() {
        const content = this.props.table.length > 0 ?
            <Fragment>
                <Heading value="Posts" />
                <Table 
                    data={this.props.table} 
                    criteria={this.props.criteria}
                    click={this.props.sortClick}
                />
            </Fragment> :
            <Spinner />;

        return (
            <Fragment>
                {content}
                <Root />
            </Fragment>        
        )
    }
}

const mapStateToProps = state => ({
    table: state.table,
    criteria: state.criteria,
    error: state.error
});

const mapDispatchToProps = dispatch => ({
    getUser: (data) => dispatch({type: actionTypes.getUser, data: data }),
    raiseError: (err) => dispatch({type: actionTypes.raiseError, error: err}),
    sortClick: (att) => dispatch({type: actionTypes.sortClick, att: att}),
    remUrl: () => dispatch({type: actionTypes.remUrl})
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts)