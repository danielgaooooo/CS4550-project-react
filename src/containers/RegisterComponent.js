import React from 'react';
import {Link} from 'react-router-dom';
import UserService from "../services/UserService";

export default class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            verifyPass: ''
        };

        this.passwordChanged = this.passwordChanged.bind(this);
        this.usernameChanged = this.usernameChanged.bind(this);
        this.verifyPassChanged = this.verifyPassChanged.bind(this);
        this.register = this.register.bind(this);

        this.service = UserService.instance;
    }

    register() {
        if (this.state.password !== this.state.verifyPass) {
            alert('Your passwords do not match');
        } else if (this.state.username !== '' && this.state.password !== '') {
            let user = {
                password: this.state.password,
                username: this.state.username
            };
            this.service.findUserByUsername(user.username)
                .then((response) => {
                    if (response.username !== null) {
                        alert('This username has already been taken. Please choose another.');
                    } else {
                        this.service.register(user)
                            .then(() => this.props.history.push('/login'));
                    }
                });
        } else {
            alert('Username or password cannot be blank.');
        }
    }

    passwordChanged(event) {
        this.setState({
            password: event.target.value
        });
    }

    usernameChanged(event) {
        this.setState({
            username: event.target.value
        });
    }

    verifyPassChanged(event) {
        this.setState({
            verifyPass: event.target.value
        })
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
                                <i className="fa fa-search"></i> Workout Editor
                            </Link>
                            <Link style={{paddingLeft: 20, color: 'white'}}
                                  to={`/users`}>
                                <i className="fa fa-search"></i> Find friends
                            </Link>
                        </div>
                    </div>
                </div>
                <div style={{backgroundColor: '#80bfff'}}>
                    <div style={{paddingTop: 15, paddingBottom: 15}} className='container-fluid'>
                        <h3>
                            Register
                        </h3>
                    </div>
                </div>
                <div className='container-fluid'
                     style={{paddingTop: 20}}>
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Username</label>
                            <div className="col-sm-10">
                                <input type="text"
                                       className="form-control"
                                       onChange={this.usernameChanged}
                                       placeholder="johndoe"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password"
                                       className="form-control"
                                       onChange={this.passwordChanged}
                                       placeholder="123qwe#$%"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Verify Password</label>
                            <div className="col-sm-10">
                                <input type="password"
                                       className="form-control"
                                       onChange={this.verifyPassChanged}
                                       placeholder="123qwe#$%"/>
                            </div>
                        </div>
                        <button onClick={this.register}
                                type="button"
                                className="btn btn-primary btn-block">
                            Register
                        </button>
                        <p>Don't have an account? Register with the link above!</p>
                    </form>
                </div>
            </div>
        )
    }
}