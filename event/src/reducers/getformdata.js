


const initialState ={"url":{"url":"","favicon":""}
,"datas":{}
};

function set_url(state,payload){
  //window.alert(payload.url.url);
  state.url.url=payload.url.url;
  state.datas=payload.datas;
  return state;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_URL':
    return Object.assign({}, state, set_url(state,action.payload));

    default:
      return state;
  }
};
