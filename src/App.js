import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './containers/Home';
import ExerciseManager from "./containers/ExerciseManager";
import LoginComponent from "./containers/LoginComponent";
import RegisterComponent from "./containers/RegisterComponent";
import ProfileComponent from "./containers/ProfileComponent";
import UserList from "./containers/UserList";
import AdminPage from "./containers/AdminPage";


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
                    <Route path='/profile/:userId' component={ProfileComponent}>
                    </Route>
                    <Route path='/users' component={UserList}>
                    </Route>
                    <Route path='/admin' component={AdminPage}>
                    </Route>
                </div>
            </Router>
        )
    }
}


