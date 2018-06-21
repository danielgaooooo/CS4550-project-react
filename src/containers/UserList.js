import React from 'react';
import {Link} from 'react-router-dom'
import UserService from "../services/UserService";

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.service = UserService.instance;
        this.findAllUsers = this.findAllUsers.bind(this);
    }

    findAllUsers() {
        this.service.findAllUsers()
            .then(response => this.setState({users: response}));
    }

    componentDidMount() {
        this.findAllUsers();
    }

    renderUsers() {
        let users = null;
        if (this.state) {
            users = this.state.users.map(
                (user) => <li className='list-group-item'
                              key={user.id}>{user.username}</li>
            );
        }
        return users;
    }

    render() {
        return (
            <div>
                <div style={{backgroundColor: '#3399ff'}}>
                    <div style={{padding: 20}}>
                        <header>
                            <h1>Workout Tool</h1>
                        </header>
                        <div className='row container-fluid'>
                            <Link style={{paddingRight: 20, color: 'white'}}
                                  to={`/`}>
                                <i className="fa fa-home"></i> Home
                            </Link>
                            <Link style={{paddingRight: 20, paddingLeft: 20, color: 'white'}}
                                  to={`/login`}>
                                <i className="fa fa-sign-in"></i> Login
                            </Link>
                            <Link style={{paddingRight: 20, paddingLeft: 20, color: 'white'}}
                                  to={`/register`}>
                                <i className="fa fa-user-plus"></i> Register
                            </Link>
                            <Link style={{paddingRight: 20, paddingLeft: 20, color: 'white'}}
                                  to={`/search`}>
                                <i className="fa fa-search"></i> Search for exercises
                            </Link>
                            <Link style={{paddingLeft: 20, color: 'white'}}
                                  to={`users`}>
                                <i className="fa fa-search"></i> Find friends
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <ul className='list-group'>
                        {this.renderUsers()}
                    </ul>
                </div>
            </div>
        )
    }
}