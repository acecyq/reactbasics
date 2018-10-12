import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Table from '../table/table';
import Spinner from '../../ui/spinner/spinner';
import Heading from '../../ui/heading/heading';
import Root from '../root/root';

export default class extends Component {
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
        axios.get('posts?userId=' + index)
            .then(res => {
                this.setState({ data : res.data });
            })
            .catch(err => console.log(err));
    }

    render() {
        const content = this.state.data ?
            <Fragment>
                <Heading value="Posts" />
                <Table 
                    data={this.state.data} 
                    criteria={this.state.criteria}
                    click={this.headingClick}
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