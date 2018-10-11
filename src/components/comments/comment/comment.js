import React from 'react';

export default props => (
    <div>
        <p><strong>{props.name}</strong></p>
        <p><strong>{props.email}</strong></p>
        <p>{props.body}</p>
    </div>
)
