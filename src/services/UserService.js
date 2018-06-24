let _singleton = Symbol();

let HEROKU_URL = 'http://localhost:8080';

class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }

    findAllUsers() {
        return fetch(HEROKU_URL + '/api/user', {
            credentials: 'include'
        })
            .then(response => response.json());
    }

    findUserById(id) {
        return fetch(HEROKU_URL + '/api/user/' + id, {
            credentials: 'include'
        })
            .then(response => response.json());
    }

    updateUser(userId, user) {
        return fetch(HEROKU_URL + '/api/user/' + userId, {
            method: 'put',
            credentials: 'include',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
    }

    deleteUser(userId) {
        return fetch(HEROKU_URL + '/api/user/' + userId, {
            method: 'delete',
            credentials: 'include'
        });
    }

    login(user) {
        return fetch(HEROKU_URL + '/api/login', {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            });
    }

    logout() {
        return fetch(HEROKU_URL + '/api/logout', {
            method: 'post',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    findUserByUsername(username) {
        return fetch(HEROKU_URL + '/api/register/' + username, {
            credentials: 'include'
        })
            .then(response => response.json());
    }

    register(user) {
        return fetch(HEROKU_URL + '/api/register', {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json());
    }

    profile() {
        return fetch(HEROKU_URL + '/api/profile', {
            credentials: 'include',
        })
            .then(response => response.json());
    }

}

export default UserService;