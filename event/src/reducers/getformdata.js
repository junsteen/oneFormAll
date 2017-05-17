


const initialState ={};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GET_FOMEDATA':
    return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};
