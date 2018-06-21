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
            newDesc = this.state.exercise.description
                .replace('<p>', '').replace('</p>', '')
                .replace('<li>', '').replace('</li>', '');
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
                <div dangerouslySetInnerHTML={{__html: newDesc}}/>
                <button>
                    Add to workout
                </button>
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