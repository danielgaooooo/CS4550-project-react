import React from 'react';
import {Link} from 'react-router-dom'
import UserService from "../services/UserService";

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loggedIn: false,
            userId: '',
            admin: false
        };
        this.service = UserService.instance;
        this.findAllUsers = this.findAllUsers.bind(this);
        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.service.logout()
            .then(this.props.history.push('/'));
    }

    findAllUsers() {
        this.service.findAllUsers()
            .then(response => this.setState({users: response}));
    }

    checkIfLoggedIn() {
        this.service.checkIfLoggedIn()
            .then(response => {
                if (response.username !== null) {
                    this.setState({loggedIn: true});
                    this.service.profile()
                        .then(user => this.setState({
                            userId: user.id,
                            admin: user.username === 'admin'
                        }))
                }
            })
    }

    componentDidMount() {
        this.findAllUsers();
        this.checkIfLoggedIn();
    }

    renderUsers() {
        let users = null;
        if (this.state) {
            users = this.state.users.map(
                (user) =>
                    <li className='list-group-item'
                        key={user.id}>
                        {user.username}
                        <Link to={`/profile/${user.id}`}>
                            <button className='btn btn-primary float-right'
                                    type='button'>
                                View
                            </button>
                        </Link>
                    </li>
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
                                  hidden={this.state.loggedIn}
                                  to={`/login`}>
                                <i className="fa fa-sign-in"></i> Login
                            </Link>
                            <Link style={{paddingRight: 20, paddingLeft: 20, color: 'white'}}
                                  hidden={this.state.loggedIn && !this.state.admin}
                                  to={`/register`}>
                                <i className="fa fa-user-plus"></i> Register
                            </Link>
                            <Link style={{paddingRight: 20, paddingLeft: 20, color: 'white'}}
                                  hidden={!this.state.loggedIn}
                                  to={`/profile/${this.state.userId}`}>
                                <i className="fa fa-user-plus"></i> Profile
                            </Link>
                            <Link style={{paddingRight: 20, paddingLeft: 20, color: 'white'}}
                                  to={`/search`}>
                                <i className="fa fa-search"></i> Workout Editor
                            </Link>
                            <Link style={{paddingLeft: 20, color: 'white'}}
                                  to={`/users`}>
                                <i className="fa fa-search"></i> Users
                            </Link>
                            <Link style={{paddingLeft: 20, color: 'white'}}
                                  hidden={!this.state.loggedIn}
                                  to={`/`}>
                                <button type='button'
                                        className='btn btn-link'
                                        style={{paddingLeft: 20, paddingTop: 0, color: 'white'}}
                                        onClick={this.logout}>
                                    <i className="fa fa-sign-out"></i> Log out
                                </button>
                            </Link>
                            <Link style={{paddingLeft: 20, color: 'white'}}
                                  hidden={!this.state.admin}
                                  to={`/admin`}>
                                <i className="fa fa-star"></i> Admin page
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