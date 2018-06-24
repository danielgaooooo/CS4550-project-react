import React from 'react';
import WorkoutService from "../services/WorkoutService";
import WorkoutItem from "../components/WorkoutItem";
import UserService from "../services/UserService";

export default class WorkoutEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workouts: [],
            counter: 0,
            loggedIn: false,
            admin: false,
            userId: ''
        };
        this.renderWorkoutRows = this.renderWorkoutRows.bind(this);
        this.addWorkout = this.addWorkout.bind(this);
        this.deleteWorkout = this.deleteWorkout.bind(this);
        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
        this.findWorkoutsForUser = this.findWorkoutsForUser.bind(this);
        this.service = WorkoutService.instance;
        this.userService = UserService.instance;
    }

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    findWorkoutsForUser() {
        if (this.state.loggedIn) {
            this.service.findAllWorkoutsForUser(this.state.userId)
                .then(response => this.setState({workouts: response}));
        }
    }

    checkIfLoggedIn() {
        this.userService.checkIfLoggedIn()
            .then(response => {
                if (response.username !== null) {
                    this.setState({loggedIn: true});
                    this.userService.profile()
                        .then(user => this.setState({
                            userId: user.id,
                            admin: user.username === 'admin'
                        }, this.findWorkoutsForUser))
                } else {
                    this.setState({
                        loggedIn: false,
                        admin: false
                    })
                }
            })
    }

    deleteWorkout(workoutId) {
        let workouts = this.state.workouts.filter(workout => workout.id !== workoutId);
        this.service.deleteWorkout(workoutId)
            .then(() => this.setState({workouts: workouts}))
    }


    addWorkout() {
        let newWorkout = {
            id: this.state.counter++,
            name: 'New Workout',
        };
        this.service.createWorkout(newWorkout, this.state.userId)
            .then((workout) =>
                this.setState({
                    workouts: [
                        ...this.state.workouts, workout
                    ]
                }))
    }

    renderWorkoutRows() {
        let deleteWorkout = this.deleteWorkout;
        let workouts = null;
        if (this.state) {
            workouts = this.state.workouts.map(
                (workout) =>
                    <WorkoutItem workout={workout}
                                 handler={deleteWorkout}
                                 key={workout.id}/>
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
                <div style={{paddingTop: 10}}
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
                </div>
            </div>
        )
    }
}