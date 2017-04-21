


const initialState ={"last-name":"杉田"
,"first-name":"淳"
,"last-name-katakana":"スギタ"
,"first-name-katakana":"ジュン"
,"last-name-hirakana":"すぎた"
,"first-name-hirakana":"じゅん"
,"last-name-roma":"SUGITA"
,"first-name-roma":"JUN"
,"name-space":""
,"email":"sole@yattaru.net"
,"re-email":"sole@yattaru.net"
,"tel1":"090"
,"tel2":"1135"
,"tel3":"9036"
,"contact-tel-byte2":""
,"contact-tel-hyphen":""
,"zip1":"563"
,"zip2":"0024"
,"contact-zip-byte2":""
,"contact-zip-hyphen":""
,"pref":"大阪府"
,"city":"池田市鉢塚"
,"addr":"2-11-6"
,"build":""
,"contact-byte2":""
,"contact-space":""
,"office-name":""
,"office-div":""
,"office-position":""
,"office-email":""
,"re-office-email":""
,"office-tel1":""
,"office-tel2":""
,"office-tel3":""
,"office-fax1":""
,"office-fax2":""
,"office-fax3":""
,"office-tel-byte2":""
,"office-tel-hyphen":""
,"office-zip1":""
,"office-zip2":""
,"office-zip-byte2":""
,"office-zip-hyphen":""
,"office-pref":""
,"office-city":""
,"office-addr":""
,"office-build":""
,"office-contact-byte2":""
,"office-contact-space":""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STOREFOMES':
      return state;
    default:
      return state;
  }
};
