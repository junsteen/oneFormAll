const initialState = {c:0};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COUNT':
      //return state + (action.payload || 1);
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
