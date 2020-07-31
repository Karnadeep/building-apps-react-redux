import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunk from "redux-thunk"
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialStore) {

    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // Add support for Redux devtools

    return createStore(
        rootReducer,
        initialStore,
        composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())))
}