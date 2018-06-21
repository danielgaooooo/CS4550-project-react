import React from 'react';
import {Route, Link} from 'react-router-dom';
import ExerciseSearchList from "./ExerciseSearchList";
import ExerciseItem from '../components/ExerciseItem';
import WorkoutEditor from './WorkoutEditor';

export default class ExerciseManager extends React.Component {

    render() {
        return (
            <div>
                <div style={{backgroundColor: 'thistle'}}>
                    <div style={{padding: 20}}>
                        <header>
                            <h1>Workout Tool</h1>
                        </header>
                        <div className='row container-fluid'>
                            <Link style={{paddingRight: 20}} to={`/`}>
                                <i className="fa fa-home"></i> Home
                            </Link>
                            <Link style={{paddingRight: 20, paddingLeft: 20}} to={`login`}>
                                <i className="fa fa-sign-in"></i> Login
                            </Link>
                            <Link style={{paddingRight: 20, paddingLeft: 20}} to={`register`}>
                                <i className="fa fa-user-plus"></i> Register
                            </Link>
                            <Link style={{paddingLeft: 20}} to={`search`}>
                                <i className="fa fa-search"></i> Search for exercises
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <ExerciseSearchList/>
                    </div>
                    <div className="col-4">
                        <Route path='/search/:exerciseId' component={ExerciseItem}>
                        </Route>
                    </div>
                    <div className="col-4">
                        <Route path='/search/:exerciseId' component={WorkoutEditor}>
                        </Route>
                    </div>
                </div>
            </div>
        )
    }
}