let _singleton = Symbol();

let HEROKU_URL = 'http://localhost:8080';

class WorkoutService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new WorkoutService(_singleton);
        return this[_singleton]
    }

    updateWorkout(workout, workoutId) {
        return fetch(HEROKU_URL + '/api/workout/' + workoutId, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(workout)
        })
            .then(response => response.json())
    }

    findAllWorkoutsForUser(userId) {
        return fetch(HEROKU_URL + '/api/workout/user/' + userId, {
            credentials: 'include'
        })
            .then(response => response.json());
    }

    createWorkout(workout, userId) {
        return fetch(HEROKU_URL + '/api/workout/' + userId, {
            method: 'post',
            body: JSON.stringify(workout),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => response.json())
    }

    deleteWorkout(workoutId) {
        return fetch(HEROKU_URL + '/api/workout/' + workoutId, {
            method: 'delete',
            credentials: 'include'
        })
    }

}

export default WorkoutService;