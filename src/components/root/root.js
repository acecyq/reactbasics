import React from 'react';
import { Link } from 'react-router-dom';
import './root.css';

export default props => (
    <div className="root">
        <Link to="/users">Back to Users</Link>
    </div>
);