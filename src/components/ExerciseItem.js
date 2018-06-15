import React from 'react';
import ExerciseService from "../services/ExerciseService";

export default class ExerciseItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            exercise: ''
        };
        this.service = ExerciseService.instance;
        this.renderExercise = this.renderExercise.bind(this);
    }

    componentDidMount() {
        this.setExerciseId();
    }

    setExerciseId() {
        let id = this.props.match.params.exerciseId;
        this.setState({id: id}, this.getExerciseById(id));
    }

    getExerciseById(id) {
        this.service.findExerciseById(id)
            .then(exercise => this.setState({exercise: exercise}));
    }

    renderExercise() {
        return (
            <div>
                <h2>
                    Description
                </h2>
                {this.state.exercise.description}
            </div>
        )
    }

    render() {
        return (
            <div className='container-fluid'>
                <h1>Exercise Item</h1>
            </div>
        )
    }
}