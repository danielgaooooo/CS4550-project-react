import React from 'react';
import {Route, Link} from 'react-router-dom';
import ExerciseSearchList from "./ExerciseSearchList";
import ExerciseItem from '../components/ExerciseItem';
import WorkoutEditor from './WorkoutEditor';
import UserService from "../services/UserService";

export default class ExerciseManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            userId: '',
            admin: false
        };
        this.service = UserService.instance;
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.service.logout()
            .then(this.props.history.push('/'));
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
                <div hidden={!this.state.loggedIn}>
                    <div className="row">
                        <div style={{paddingRight: 0}} className="col-4">
                            <WorkoutEditor/>
                        </div>
                        <div style={{paddingLeft: 0, paddingRight: 0}} className="col-4">
                            <Route path='/search/:workoutId' component={ExerciseSearchList}>
                            </Route>
                        </div>
                        <div style={{paddingRight: 0, paddingLeft: 0}} className="col-4">
                            <Route path='/search/:workoutId/exercise/:exerciseId' component={ExerciseItem}>
                            </Route>
                        </div>
                    </div>
                </div>
                <div hidden={this.state.loggedIn}>
                    <div className="row">
                        <div style={{paddingRight: 0}} className="col-4">
                            <div style={{backgroundColor: '#80bfff'}}>
                                <div style={{paddingTop: 15, paddingBottom: 15}} className='container-fluid'>
                                    <h3>
                                        Sign in to save workouts
                                    </h3>
                                </div>
                            </div>
                            <div style={{paddingTop: 20}} className='container-fluid'>
                                <p>
                                    In order to create and update your own custom workouts,
                                    either register above, or log in if you already have an account.
                                </p>
                            </div>
                        </div>
                        <div style={{paddingLeft: 0, paddingRight: 0}} className="col-4">
                            <Route path='/search' component={ExerciseSearchList}>
                            </Route>
                        </div>
                        <div style={{paddingRight: 0, paddingLeft: 0}} className="col-4">
                            <Route path='/search/:workoutId/exercise/:exerciseId' component={ExerciseItem}>
                            </Route>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}