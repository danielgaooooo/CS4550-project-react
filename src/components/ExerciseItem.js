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
        this.setExerciseId(this.props.match.params.exerciseId);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.match.params.exerciseId !== this.state.id) {
            this.setExerciseId(newProps.match.params.exerciseId);
        }
    }

    setExerciseId(newId) {
        this.setState({id: newId}, this.getExerciseById(newId));
    }

    getExerciseById(id) {
        this.service.findExerciseById(id)
            .then(exercise => this.setState({exercise: exercise}));
    }

    renderExercise() {
        let newDesc;
        let newName;
        if (this.state.exercise.description !== undefined) {
            newDesc = this.state.exercise.description.replace('<p>', '').replace('</p>', '');
            newName = this.state.exercise.name;
        }
        return (
            <div>
                <h3>
                    Name
                </h3>
                {newName}
                <h3>
                    Description
                </h3>
                {newDesc}
                <button>
                    Add to workout
                </button>
            </div>
        )
    }

    render() {
        return (
            <div className='container-fluid'>
                <h1>Exercise Item</h1>
                {this.renderExercise()}
            </div>
        )
    }
}