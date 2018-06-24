import React from 'react';
import {Link} from 'react-router-dom';
import WorkoutService from "../services/WorkoutService";

export default class WorkoutEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workouts: []
        };
        this.renderWorkoutRows = this.renderWorkoutRows.bind(this);
        this.addWorkout = this.addWorkout.bind(this);
        this.service = WorkoutService.instance;
    }

    addWorkout() {
        this.setState({
            workouts: [
                ...this.state.workouts, {
                    id: this.state.workouts.length,
                    name: 'New Workout',
                    description: 'New Workout Description'
                }
            ]
        })
    }

    saveWorkouts() {

    }

    renderWorkoutRows() {
        let workouts = null;
        if (this.state) {
            workouts = this.state.workouts.map(
                (workout) =>
                    <li className='list-group-item'
                        key={workout.id}>
                        <Link to={`/search/${workout.id}`}>{workout.name}</Link>
                    </li>
            );
        }
        return workouts;
    }

    render() {
        return (
            <div>
                <div style={{backgroundColor: '#80bfff'}}>
                    <div style={{paddingTop: 15, paddingBottom: 15}} className='container-fluid'>
                        <h3>
                            Workout Editor &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </h3>
                    </div>
                </div>
                <div style={{paddingTop: 20}}
                     className='container-fluid'>
                    {this.renderWorkoutRows()}
                </div>
                <div className='container-fluid'
                     style={{paddingTop: 20}}>
                    <div style={{paddingBottom: 20}}>
                        <button className='btn btn-primary btn-block'
                                onClick={this.addWorkout}
                                type='button'>
                            Add a workout
                        </button>
                    </div>
                    <div>
                        <button className='btn btn-success btn-block'
                                onClick={this.saveWorkouts}
                                type='button'>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}