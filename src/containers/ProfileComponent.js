import React from 'react';
import {Link} from 'react-router-dom';
import UserService from "../services/UserService";


export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            user: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                workouts: []
            },
            loggedIn: false,
            myUserId: '',
            admin: false
        };
        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
        this.newUser = this.newUser.bind(this);
        this.logout = this.logout.bind(this);
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.service = UserService.instance;
    }

    updateUser() {
        let user = this.state.user;
        this.service.updateUser(user, this.state.userId)
            .then(() => alert('Profile successfully updated.'))
    }

    logout() {
        this.service.logout()
            .then(this.props.history.push('/'));
    }

    changeUsername(event) {
        this.setState({
            user: {
                username: event.target.value,
                firstName: this.state.user.firstName,
                lastName: this.state.user.lastName,
                email: this.state.user.email,
                phone: this.state.user.phone,
                workouts: this.state.user.workouts
            }
        });
    }

    changeFirstName(event) {
        this.setState({
            user: {
                username: this.state.user.username,
                firstName: event.target.value,
                lastName: this.state.user.lastName,
                email: this.state.user.email,
                phone: this.state.user.phone,
                workouts: this.state.user.workouts
            }
        });
    }

    changeLastName(event) {
        this.setState({
            user: {
                username: this.state.user.username,
                firstName: this.state.user.firstName,
                lastName: event.target.value,
                email: this.state.user.email,
                phone: this.state.user.phone,
                workouts: this.state.user.workouts
            }
        });
    }

    changeEmail(event) {
        this.setState({
            user: {
                username: this.state.user.username,
                firstName: this.state.user.firstName,
                lastName: this.state.user.lastName,
                email: event.target.value,
                phone: this.state.user.phone,
                workouts: this.state.user.workouts
            }
        });
    }

    changePhone(event) {
        this.setState({
            user: {
                username: this.state.user.username,
                firstName: this.state.user.firstName,
                lastName: this.state.user.lastName,
                email: this.state.user.email,
                phone: event.target.value,
                workouts: this.state.user.workouts
            }
        });
    }

    checkIfLoggedIn() {
        this.service.checkIfLoggedIn()
            .then(response => {
                if (response.username !== null) {
                    this.setState({loggedIn: true});
                    this.service.profile()
                        .then(user => this.setState({
                            myUserId: user.id,
                            admin: user.username === 'admin'
                        }))
                }
            })
    }

    componentWillReceiveProps(newProps) {
        let newId = newProps.match.params.userId;
        if (newId !== this.state.userId) {
            this.newUser(newId);
        }
    }

    newUser(userId) {
        this.setState({userId: userId}, () => {
            this.service.findUserById(userId)
                .then(user => this.setState({user: user}, () => this.checkIfLoggedIn()))
        })
    }

    componentDidMount() {
        let userId = this.props.match.params.userId;
        this.newUser(userId);
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
                                  to={`/profile/${this.state.myUserId}`}>
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
                <div style={{backgroundColor: '#80bfff'}}>
                    <div style={{paddingTop: 15, paddingBottom: 15}}
                         className='container-fluid'>
                        <h3>
                            Profile
                        </h3>
                    </div>
                </div>
                <div hidden={this.state.myUserId == this.state.userId}>
                    <div className='container-fluid'
                         style={{backgroundColor: '#cce6ff', paddingTop: 20, paddingBottom: 40}}>
                        <form>
                            <div className="form-group row">
                                <label className="col-2">Username:</label>
                                <div className="col-10">
                                    <p>{this.state.user.username}</p>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-2">Name:</label>
                                <div className="col-10">
                                    <p>{this.state.user.firstName === '' ? 'Not listed' : this.state.user.firstName}</p>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-2">Workouts:</label>
                                <div className="col-10">
                                    None listed yet
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div hidden={this.state.myUserId != this.state.userId}>
                    <div className='container-fluid'
                         style={{backgroundColor: '#cce6ff', paddingTop: 20, paddingBottom: 40}}>
                        <form>
                            <div className="form-group row">
                                <label className="col-2">Username:</label>
                                <div className="col-10">
                                    <input defaultValue={this.state.user.username}
                                           className='form-control'
                                           onChange={this.changeUsername}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-2">First name:</label>
                                <div className="col-10">
                                    <input defaultValue={this.state.user.firstName}
                                           className='form-control'
                                           onChange={this.changeFirstName}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-2">Last name:</label>
                                <div className="col-10">
                                    <input defaultValue={this.state.user.lastName}
                                           className='form-control'
                                           onChange={this.changeLastName}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-2">Email</label>
                                <div className="col-10">
                                    <input defaultValue={this.state.user.email}
                                           className='form-control'
                                           onChange={this.changeEmail}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-2">Phone</label>
                                <div className="col-10">
                                    <input defaultValue={this.state.user.phone}
                                           className='form-control'
                                           onChange={this.changePhone}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-2">Workouts:</label>
                                <div className="col-10">
                                    None listed yet
                                </div>
                            </div>
                        </form>
                        <button
                            onClick={this.updateUser}
                            className='btn btn-block btn-primary'>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}