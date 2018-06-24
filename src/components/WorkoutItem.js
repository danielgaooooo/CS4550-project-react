import React from 'react';
import {Link} from 'react-router-dom'
import WorkoutService from '../services/WorkoutService';

export default class WorkoutItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workout: {
                id: '',
                name: ''
            },
            editing: false
        };

        this.editWorkout = this.editWorkout.bind(this);
        this.updateWorkout = this.updateWorkout.bind(this);
        this.workoutNameChanged = this.workoutNameChanged.bind(this);
        this.service = WorkoutService.instance;
    }

    componentDidMount() {
        this.setState({workout: this.props.workout});
    }

    editWorkout() {
        this.setState({editing: true});
    }

    updateWorkout() {
        this.setState({editing: false},
            () => this.service.updateWorkout(this.state.workout, this.state.workout.id));
    }

    workoutNameChanged(event) {
        this.setState({
            workout: {
                id: this.state.workout.id,
                name: event.target.value,
            }
        })
    }

    render() {
        let workout = this.state.workout;
        return (
            <div style={{padding: 10}}>
                <li className='list-group-item'
                    key={workout.id}>
                    <div hidden={this.state.editing}>
                        <Link to={`/search/${workout.id}`}>{workout.name}</Link>
                        <button className="btn float-right"
                                style={{paddingRight: 5, paddingLeft: 5, paddingTop: 0}}
                                onClick={() => this.props.handler(workout.id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                        <button className="btn float-right"
                                style={{paddingRight: 5, paddingLeft: 5, paddingTop: 0}}
                                onClick={() => this.editWorkout()}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </div>
                    <div hidden={!this.state.editing}>
                        <input defaultValue={workout.name}
                               onChange={this.workoutNameChanged}/>
                        <button className="btn float-right"
                                style={{paddingRight: 5, paddingLeft: 5, paddingTop: 0}}
                                onClick={() => this.props.handler(workout.id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                        <button className="btn float-right"
                                style={{paddingRight: 5, paddingLeft: 5, paddingTop: 0}}
                                onClick={() => this.updateWorkout()}>
                            <i className="fa fa-check"></i>
                        </button>
                    </div>
                </li>
            </div>
        )
    }
}