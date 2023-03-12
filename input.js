const redux = require('redux')
const createStore = redux.createStore


// (
//     store,
//     action,
//     reducer
// )

const BUY_DOG = 'BUY_DOG'

const SELL_DOG = 'SELL_DOG'

function buyDog () {
    return {
        type: BUY_DOG,
        payload: 1,
    }
}

function sellDog (qty=1){
    return {
        type: SELL_DOG,
        payload: qty,
    }
}

const initialState = {
    numOfDogs: 20
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case BUY_DOG:
            return {
                ...state,
                numOfDogs: state.numOfDogs - 1
            }
        case SELL_DOG:
            return {
                ...state,
                numOfDogs: state.numOfDogs + action.payload,
            }
        default:
            return state
    }
}

const store = createStore(reducer)
console.log('Initial state ', store.getState())

const unsubscribe = store.subscribe(() => console.log('Update state ', store.getState()))

store.dispatch ( buyDog())
store.dispatch ( buyDog())
store.dispatch ( sellDog(3))

unsubscribe()