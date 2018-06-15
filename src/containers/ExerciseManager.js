import React from 'react';
import {Route} from 'react-router-dom';
import ExerciseSearchList from "./ExerciseSearchList";
import ExerciseItem from '../components/ExerciseItem';
import WorkoutEditor from './WorkoutEditor';

export default class ExerciseManager extends React.Component {

    render() {
        return (
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
        )
    }
}