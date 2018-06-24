import React from 'react';
import {Link} from 'react-router-dom';
import UserService from "../services/UserService";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            userId: '',
            admin: false
        };
        this.service = UserService.instance;
        this.logout = this.logout.bind(this);
        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    }

    logout() {
        this.service.logout()
            .then(this.checkIfLoggedIn);
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
                } else {
                    this.setState({
                        loggedIn: false,
                        admin: false
                    })
                }
            })
    }

    componentDidMount() {
        this.checkIfLoggedIn();
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
                                  hidden={this.state.loggedIn}
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
                                <i className="fa fa-search"></i> Find friends
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
                    <div style={{backgroundColor: '#80bfff'}}>
                        <div style={{paddingTop: 15, paddingBottom: 15}} className='container-fluid'>
                            <h3>
                                Welcome to the world's greatest, easiest, and best-looking workout creator
                                and organizer!
                            </h3>
                        </div>
                    </div>
                    <div style={{backgroundColor: '#cce6ff', paddingTop: 20, paddingBottom: 40}}>
                        <div className='container-fluid'>
                            <div style={{paddingTop: 10}} className='row'>
                                <div className='col-4'>
                                    <p>
                                        With a completely free account, users can:
                                    </p>
                                </div>
                                <div className='col-8'>
                                    <ul>
                                        <li>
                                            Create workouts with exercises from our database
                                        </li>
                                        <li>
                                            Save and access previous workouts
                                        </li>
                                        <li>
                                            Add their own exercises to their workouts
                                        </li>
                                        <li>
                                            Follow other users and check out their workouts
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p>
                                To get started, just register with the link above, or log in if you are
                                already a member.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}