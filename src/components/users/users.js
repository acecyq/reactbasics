import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import actionTypes from '../../store/Action';
import Spinner from '../../ui/spinner/spinner';
import Heading from '../../ui/heading/heading';
import Table from '../../components/table/table';

class Users extends Component {
    fetchUsers = () => {
        axios.get('/users')
			.then(res => {
				this.props.getUser(res.data);
			})
			.catch(err => {
				this.props.raiseError(err);
			});
    }

    componentWillUnmount() {
        this.props.remUrl();
        console.log('USERS COMPONENT UNMOUNTING!!!');
        axios.get('/', {
            data: `cancel ${this.props.location.pathname.split('/')[1]}`
        })
            .then(res => {
                console.log('REMOVED CANCEL TOKEN FOR USERS!!!');
            });
    }

    render() {
        const content = this.props.table.length > 0 ?
            <Fragment>
                <Heading value="Users" />
                <Table 
                    data={this.props.table} 
                    criteria={this.props.criteria} 
                    click={this.props.sortClick} 
                />
            </Fragment> :
            <Spinner/>

        return (
            <Fragment>
                <button onClick={this.fetchUsers}>Fetch USERS</button>
                <Link to='/posts/?user=1'>
                    <button>GO TO USER 1</button>
                </Link>
                {content}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);