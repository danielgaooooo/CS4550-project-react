let _singleton = Symbol();

let EXERCISE_API_URL = 'https://wger.de/api/v2/exercise/?language=2';

class ExerciseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExerciseService(_singleton);
        return this[_singleton]
    }

    findExerciseByKeyword(keyword) {
        let val;
        switch(keyword) {
            case "Abs":
                val = 10;
                break;
            case "Arms":
                val = 8;
                break;
            case "Back":
                val = 12;
                break;
            case "Calves":
                val = 14;
                break;
            case "Shoulders":
                val = 13;
                break;
            case "Legs":
                val = 9;
                break;
            case "Chest":
                val = 11;
        }
        return fetch(EXERCISE_API_URL + '&category=' + val)
            .then(response => (
                response.json()
            ))
    }

    findExerciseById(id) {
        return fetch(EXERCISE_API_URL + '&id=' + id)
            .then(response => (
                response.json()
            ))
    }
}

export default ExerciseService;