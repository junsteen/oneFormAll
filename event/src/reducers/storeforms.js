



const initialState ={"last-name":{"time":"3600","name":"杉田"}
,"first-name":{"time":"3601","name":"淳"}
,"last-name-katakana":{"time":"3602","name":"スギタ"}
,"first-name-katakana":{"time":"3603","name":"ジュン"}
,"last-name-hirakana":{"time":"3604","name":"すぎた"}
,"first-name-hirakana":{"time":"3605","name":"じゅん"}
,"last-name-roma":{"time":"3606","name":"SUGITA"}
,"first-name-roma":{"time":"3607","name":"JUN"}
,"name-space":{"time":"3608","name":""}
,"email":{"time":"3609","name":"sole@yattaru.net"}
,"re-email":{"time":"3610","name":"sole@yattaru.net"}
,"tel1":{"time":"3611","name":"090"}
,"tel2":{"time":"3612","name":"1135"}
,"tel3":{"time":"3613","name":"9036"}
,"contact-tel-byte2":{"time":"3614","name":""}
,"contact-tel-hyphen":{"time":"3615","name":""}
,"zip1":{"time":"3616","name":"563"}
,"zip2":{"time":"3617","name":"0024"}
,"contact-zip-byte2":{"time":"3618","name":""}
,"contact-zip-hyphen":{"time":"3619","name":""}
,"pref":{"time":"3620","name":"大阪府"}
,"city":{"time":"3621","name":"池田市鉢塚"}
,"addr":{"time":"3622","name":"2-11-6"}
,"build":{"time":"3623","name":""}
,"contact-byte2":{"time":"3624","name":""}
,"contact-space":{"time":"3625","name":""}
,"office-name":{"time":"3626","name":""}
,"office-div":{"time":"3627","name":""}
,"office-position":{"time":"3628","name":""}
,"office-email":{"time":"3629","name":""}
,"re-office-email":{"time":"3630","name":""}
,"office-tel1":{"time":"3631","name":""}
,"office-tel2":{"time":"3632","name":""}
,"office-tel3":{"time":"3633","name":""}
,"office-fax1":{"time":"3634","name":""}
,"office-fax2":{"time":"3635","name":""}
,"office-fax3":{"time":"3636","name":""}
,"office-tel-byte2":{"time":"3637","name":""}
,"office-tel-hyphen":{"time":"3638","name":""}
,"office-zip1":{"time":"3639","name":""}
,"office-zip2":{"time":"3640","name":""}
,"office-zip-byte2":{"time":"3641","name":""}
,"office-zip-hyphen":{"time":"3642","name":""}
,"office-pref":{"time":"3643","name":""}
,"office-city":{"time":"3644","name":""}
,"office-addr":{"time":"3645","name":""}
,"office-build":{"time":"3646","name":""}
,"office-contact-byte2":{"time":"3647","name":""}
,"office-contact-space":{"time":"3648","name":""}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_GET_STOREFOMES':
    return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};
