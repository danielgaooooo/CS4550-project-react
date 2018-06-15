import React from 'react';
import {Link} from 'react-router-dom'
import ExerciseService from '../services/ExerciseService';

export default class ExerciseSearchList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: 'Abs',
            exercises: []
        };
        this.service = ExerciseService.instance;
        this.keywordChanged = this.keywordChanged.bind(this);
        this.findExerciseByKeyword = this.findExerciseByKeyword.bind(this);
        this.renderExercises = this.renderExercises.bind(this);
    }

    keywordChanged(event) {
        this.setState({
            keyword: event.target.value
        })
    }

    findExerciseByKeyword() {
        this.service.findExerciseByKeyword(this.state.keyword)
            .then(exercises => this.setState({
                exercises: exercises.results
            }));
    }

    renderExercises() {
        let exercises = null;
        if (this.state) {
            exercises = this.state.exercises.map(exercise => {
                if (exercise.name !== '') {
                    return <li key={exercise.id}><Link to={`/search/${exercise.uuid}`}>{exercise.name}</Link></li>
                }
            });
        }
        return exercises;
    }

    render() {
        return (
            <div className='container-fluid'>
                <h1>Exercise search</h1>
                <div className="form-group">
                    <label>Example select</label>
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
                </div>
                <button onClick={this.findExerciseByKeyword}>Search</button>
            </div>
        )
    }
}


