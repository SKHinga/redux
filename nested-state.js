const redux = require('redux')
const createStore = redux.createStore
const produce = require('immer').produce

const CHANGE_STREET = 'CHANGE_STREET'

// action

function changeStreet (str) {
    return {
        type: CHANGE_STREET,
        payload: str
    }
}

const initialState = {
    name: 'Hinga',
    address: {
        street: 'Koinange Street',
        city: 'Nairobi',
        state: 'Blanco',
    },
    age: 'Young',
}

//reducer

const reducer = (state = initialState, action) => {
    switch (action.type){
        case CHANGE_STREET:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload,
            //     }
            // }
            return produce (state, (draft) => {
                draft.address.street = action.payload
            })
        default: state
    }
}

const store = createStore(reducer)
// console.log('initial state', store.getState())

const unsubscribe = store.subscribe(()=> console.log('Update state ', store.getState()))

store.dispatch (changeStreet('Kitusulu'))

unsubscribe()