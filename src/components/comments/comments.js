import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Table from '../table/table';
import Spinner from '../../ui/spinner/spinner';
import Heading from '../../ui/heading/heading';
import Root from '../root/root';
import actionTypes from '../../store/Action';

class Comments extends Component {
    // state = {
    //     data : null,
    //     criteria : null
    // }

    componentDidMount() {

        // get index from this.props.match.params
        // send get request for the comments pertaining to the post with id of index
        axios.get(`/posts/${this.props.match.params.id}/comments`)
            .then(res => {
                this.props.getUser(res.data);
            })
            .catch(err => {
                this.props.raiseError(err);
            });
    }

    componentWillUnmount() {
        this.props.remUrl();
        console.log('COMMENTS COMPONENT UNMOUNTING!!!');
        axios.get('/', {
            data: `cancel ${this.props.location.pathname.split('/')[1]}`
        })
            .then(res => {
                console.log('REMOVE CANCEL TOKEN FOR COMMENTS!!!');
            });
    }

    render() {
        const content = this.props.table.length > 0 ?
            <Fragment>
                <Heading value="Comments" />
                <Table 
                    data={this.props.table} 
                    criteria={this.props.criteria}
                    click={this.props.sortClick}
                />
            </Fragment>
             :
            <Spinner />;

        return (
            <Fragment>
                {content}
                <Root />
            </Fragment>
        );
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
