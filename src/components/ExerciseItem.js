import React from 'react';
import ExerciseService from "../services/ExerciseService";

export default class ExerciseItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseId: '',
            workoutId: '',
            exercise: ''
        };
        this.service = ExerciseService.instance;
        this.renderExercise = this.renderExercise.bind(this);
        this.addExerciseToWorkout = this.addExerciseToWorkout.bind(this);
    }

    componentDidMount() {
        this.setExerciseId(this.props.match.params.exerciseId);
        this.setWorkoutId(this.props.match.params.workoutId);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.match.params.exerciseId !== this.state.id) {
            this.setExerciseId(newProps.match.params.exerciseId);
        }
    }

    addExerciseToWorkout() {
        this.service.addExerciseToWorkout(this.state.exerciseId, this.state.workoutId)
            .then(() => alert('Successfully added.'))
    }

    setExerciseId(newId) {
        this.setState({exerciseId: newId}, this.getExerciseById(newId));
    }

    setWorkoutId(newId) {
        this.setState({workoutId: newId});
    }

    getExerciseById(id) {
        this.service.findExerciseById(id)
            .then(exercise => this.setState({exercise: exercise}));
    }

    renderExercise() {
        let newDesc;
        let newName;
        if (this.state.exercise.description !== undefined) {
            newDesc = this.state.exercise.description
                .replace('<p>', '').replace('</p>', '')
                .replace('<li>', '').replace('</li>', '');
            newName = this.state.exercise.name;
        }
        return (
            <div>
                <div style={{paddingTop: 20}}
                     className='container-fluid'>
                    <h4>
                        Name
                    </h4>
                    {newName}
                </div>
                <div style={{paddingTop: 20}}
                     className='container-fluid'>
                    <h4>
                        Description
                    </h4>
                    <div style={{paddingBottom: 20}}
                         dangerouslySetInnerHTML={{__html: newDesc}}/>
                </div>
                <div className='container-fluid'>
                    <button className='btn btn-primary'
                            onClick={this.addExerciseToWorkout}>
                        Add to workout
                    </button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div style={{backgroundColor: '#80bfff'}}>
                    <div style={{paddingTop: 15, paddingBottom: 15}} className='container-fluid'>
                        <h3>
                            Exercise Description &nbsp;
                        </h3>
                    </div>
                </div>
                {this.renderExercise()}
            </div>
        )
    }
}