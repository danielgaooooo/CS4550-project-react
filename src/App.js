import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './containers/Home';
import ExerciseManager from "./containers/ExerciseManager";
import LoginComponent from "./containers/LoginComponent";
import RegisterComponent from "./containers/RegisterComponent";
import ProfileComponent from "./containers/ProfileComponent";

export default class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='' component={Home}>
                    </Route>
                    <Route path='/search' component={ExerciseManager}>
                    </Route>
                    <Route path='/login' component={LoginComponent}>
                    </Route>
                    <Route path='/register' component={RegisterComponent}>
                    </Route>
                    <Route path='/profile' component={ProfileComponent}>
                    </Route>
                </div>
            </Router>
        )
    }
}


