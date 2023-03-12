const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combinedReducers = redux.combineReducers

const DRINK_ORDERED = 'DRINK_ORDERED'
const DRINK_RESTOCKED = 'DRINK_RESTOCKED'

const CHASER_ORDER = 'CHASER_ORDER'
const CHASER_RESTOCK = 'CHASER_RESTOCK'

// (action)

function orderDrink(){
    return {
        type: DRINK_ORDERED,
        payload: 1,
    }
}

function restockDrink(qty=1){
    return {
        type: DRINK_RESTOCKED,
        payload: qty,
    }
}

function orderChaser (){
    return {
        type: CHASER_ORDER,
        payload: 1,
    }
}

function restockChaser (qty=1){
    return {
        type: CHASER_RESTOCK,
        payload: qty,
    }
}

// (previousState) as an object

// const initialState = {
//     numOfDrinks: 10,
//     numofChasers: 20,
// }

const initialDrinksState = {
    numOfDrinks: 10,
}

const initialChasersState = {
    numofChasers: 20,
}

// (previousState, action) => newState (reducer)

const drinksReducer = (state = initialDrinksState, action) => {
    switch(action.type){
        case DRINK_ORDERED:
            return {
                ...state,
                numOfDrinks: state.numOfDrinks - 1,
            }
        case DRINK_RESTOCKED:
            return {
                ...state,
                numOfDrinks: state.numOfDrinks + action.payload,
            }
        default:
            return state
    }
}

const chasersReducer = (state = initialChasersState, action) => {
    switch(action.type){
        case CHASER_ORDER:
            return {
                ...state,
                numofChasers: state.numofChasers - 1,
            }
        case CHASER_RESTOCK:
            return {
                ...state,
                numofChasers: state.numofChasers + action.payload,
            }
        default:
            return state
    }
}

const rootReducer = combinedReducers({
    drink: drinksReducer,
    chaser: chasersReducer
})

const store = createStore(rootReducer)
console.log('initial state', store.getState())

const unsubscribe = store.subscribe(() => console.log('Update state ', store.getState()))

// store.dispatch ( orderDrink())
// store.dispatch ( orderDrink())
// store.dispatch ( orderDrink())
// store.dispatch ( restockDrink(3))

const actions = bindActionCreators({orderDrink, restockDrink, orderChaser, restockChaser}, store.dispatch)
actions.orderDrink()
actions.orderDrink()
actions.orderDrink()
actions.orderChaser()
actions.restockDrink(3)
actions.restockChaser(2)
unsubscribe()

// console.log('Latter state', store.getState())