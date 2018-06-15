import React from 'react';
import {Link} from 'react-router-dom';

export default class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>
                    home
                </h1>
                <Link to={`search`}>
                    Search for exercises
                </Link>
            </div>
        )
    }
}