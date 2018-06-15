import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './containers/Home';
import ExerciseManager from "./containers/ExerciseManager";

export default class App extends React.Component {

    render() {
        return (
            <Router>
                <div className='container-fluid'>
                    <Route exact path='' component={Home}>
                    </Route>
                    <Route path='/search' component={ExerciseManager}>
                    </Route>
                </div>
            </Router>
        )
    }
}


