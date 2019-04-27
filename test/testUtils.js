// import { applyMiddleware, createStore } from 'redux';
// import rootReducer from './../src/reducers';
// import { middlewares } from './../src/createStore';

export const findComponentByDataTestId = (component, id) => {
  return component.find(`[data-test-id='${id}']`);
};

// export const testStore = (initialState) => {
//     const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
//     return createStoreWithMiddleware(rootReducer, initialState);
// };
