import React from 'react';
import {Link} from 'react-router-dom'
import ExerciseService from '../services/ExerciseService';

export default class ExerciseSearchList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: 'Abs',
            exercises: [],
            exerciseIdUpdated: false,
            pleaseWait: false,
            workoutId: ''
        };
        this.service = ExerciseService.instance;
        this.keywordChanged = this.keywordChanged.bind(this);
        this.findExerciseByKeyword = this.findExerciseByKeyword.bind(this);
        this.renderExercises = this.renderExercises.bind(this);
    }

    componentDidMount() {
        let workoutId = this.props.match.params.workoutId;
        this.setState({workoutId: workoutId})
    }

    keywordChanged(event) {
        this.setState({
            keyword: event.target.value
        })
    }

    findExerciseByKeyword() {
        this.service.findExerciseByKeyword(this.state.keyword)
            .then(exercises => this.setState({
                exercises: exercises.results,
                exerciseIdUpdated: false,
                pleaseWait: true
            }, this.addSearchResultsToLocalDatabase(exercises.results)));
    }

    addSearchResultsToLocalDatabase(exercises) {
        this.service.addExercisesToLocalDatabase(
            exercises.filter(exercise => exercise.name !== '')
        ).then(response => this.setState({
            exercises: response,
            exerciseIdUpdated: true,
            pleaseWait: false
        }));
    }

    renderExercises() {
        let exercises = null;
        if (this.state.exerciseIdUpdated) {
            exercises = this.state.exercises.map((exercise, index) => {
                if (exercise.name !== '') {
                    return <li key={index}>
                        <Link to={`/search/${this.state.workoutId}/exercise/${exercise.id}`}>
                            {exercise.name}
                        </Link>
                    </li>
                }
            });
        }
        return exercises;
    }

    renderPleaseWait() {
        if (this.state.pleaseWait) {
            return <h6>Fetching results...</h6>
        }
    }

    render() {
        return (
            <div>
                <div style={{backgroundColor: '#80bfff'}}>
                    <div style={{paddingTop: 15, paddingBottom: 15}} className='container-fluid'>
                        <h3>
                            Search for exercises &nbsp; &nbsp;
                        </h3>
                    </div>
                </div>
                <div style={{paddingTop: 20}} className='container-fluid'>
                    <div className="form-group">
                        <select className="form-control"
                                onChange={this.keywordChanged}
                                id="exampleFormControlSelect1">
                            <option>Abs</option>
                            <option>Arms</option>
                            <option>Back</option>
                            <option>Calves</option>
                            <option>Shoulders</option>
                            <option>Legs</option>
                            <option>Chest</option>
                        </select>
                    </div>
                    <div>
                        {this.renderExercises()}
                        {this.renderPleaseWait()}
                    </div>
                    <button
                        className='btn btn-primary btn-block'
                        onClick={this.findExerciseByKeyword}>Search</button>
                </div>
            </div>
        )
    }
}


