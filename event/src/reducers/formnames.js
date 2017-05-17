
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    switch (request.type) {
    case "url":
      geturl(request.text, sendResponse);
      return true;
      break;
    case "addform":
      addform(request.text, sendResponse);
      return true;
      break;
    default:
      console.log("Error: Unkown request.")
      console.log(request);
      return true;
    }
  }
);

function geturl(name, callback) {
  chrome.tabs.getSelected(null, function(tab) {
    callback(tab);
  });
}

function addform(name, callback) {
  chrome.tabs.query({active:true}, function(tab) {
      chrome.tabs.sendMessage(tab[0].id, {type:'addform',text:''}, function(response) {
          callback(response);
       });
  });
}


function getform(){
  let formnames={"last-name":{"tagName":"姓","tag":"last-name","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
  ,"first-name":{"tagName":"名","tag":"first-name","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
  ,"last-name-katakana":{"tagName":"セイ","tag":"last-name-katakana","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
  ,"first-name-katakana":{"tagName":"メイ","tag":"first-name-katakana","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
  ,"last-name-hirakana":{"tagName":"せい","tag":"last-name-hirakana","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
  ,"first-name-hirakana":{"tagName":"めい","tag":"first-name-hirakana","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
  ,"last-name-roma":{"tagName":"性:ローマ","tag":"last-name-roma","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
  ,"first-name-roma":{"tagName":"名:ローマ","tag":"first-name-roma","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
  ,"name-space":{"tagName":"空白挿入","tag":"name-space","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
  ,"email":{"tagName":"Email","tag":"email","tagGroup":"contact-email","tagGroupName":"メール","inputName":"","tagOrder":""}
  ,"re-email":{"tagName":"Email(再)","tag":"re-email","tagGroup":"contact-email","tagGroupName":"メール","inputName":"","tagOrder":""}
  ,"tel1":{"tagName":"TEL:1","tag":"tel1","tagGroup":"contact-tel","tagGroupName":"電話","inputName":"","tagOrder":""}
  ,"tel2":{"tagName":"TEL:2","tag":"tel2","tagGroup":"contact-tel","tagGroupName":"電話","inputName":"","tagOrder":""}
  ,"tel3":{"tagName":"TEL:3","tag":"tel3","tagGroup":"contact-tel","tagGroupName":"電話","inputName":"","tagOrder":""}
  ,"contact-tel-byte2":{"tagName":"半角→全角","tag":"contact-tel-byte2","tagGroup":"contact-tel","tagGroupName":"電話","inputName":"","tagOrder":""}
  ,"contact-tel-hyphen":{"tagName":"-　挿入","tag":"contact-tel-hyphen","tagGroup":"contact-tel","tagGroupName":"電話","inputName":"","tagOrder":""}
  ,"zip1":{"tagName":"〒前","tag":"zip1","tagGroup":"contact-zip","tagGroupName":"郵便番号","inputName":"","tagOrder":""}
  ,"zip2":{"tagName":"〒後","tag":"zip2","tagGroup":"contact-zip","tagGroupName":"郵便番号","inputName":"","tagOrder":""}
  ,"contact-zip-byte2":{"tagName":"半角→全角","tag":"contact-zip-byte2","tagGroup":"contact-zip","tagGroupName":"郵便番号","inputName":"","tagOrder":""}
  ,"contact-zip-hyphen":{"tagName":"-　挿入","tag":"contact-zip-hyphen","tagGroup":"contact-zip","tagGroupName":"郵便番号","inputName":"","tagOrder":""}
  ,"pref":{"tagName":"都道府県","tag":"pref","tagGroup":"contact","tagGroupName":"住所","inputName":"","tagOrder":""}
  ,"city":{"tagName":"市区町村","tag":"city","tagGroup":"contact","tagGroupName":"住所","inputName":"","tagOrder":""}
  ,"addr":{"tagName":"詳細","tag":"addr","tagGroup":"contact","tagGroupName":"住所","inputName":"","tagOrder":""}
  ,"build":{"tagName":"ビル名","tag":"build","tagGroup":"contact","tagGroupName":"住所","inputName":"","tagOrder":""}
  ,"contact-byte2":{"tagName":"半角→全角","tag":"contact-byte2","tagGroup":"contact","tagGroupName":"住所","inputName":"","tagOrder":""}
  ,"contact-space":{"tagName":"空白挿入","tag":"contact-space","tagGroup":"contact","tagGroupName":"住所","inputName":"","tagOrder":""}
  ,"office-name":{"tagName":"社名","tag":"office-name","tagGroup":"office","tagGroupName":"会社","inputName":"","tagOrder":""}
  ,"office-div":{"tagName":"部署名","tag":"office-div","tagGroup":"office","tagGroupName":"会社","inputName":"","tagOrder":""}
  ,"office-position":{"tagName":"役職名","tag":"office-position","tagGroup":"office","tagGroupName":"会社","inputName":"","tagOrder":""}
  ,"office-email":{"tagName":"Email","tag":"office-email","tagGroup":"office-email","tagGroupName":"会社","inputName":"","tagOrder":""}
  ,"re-office-email":{"tagName":"Email(再)","tag":"re-office-email","tagGroup":"office-email","tagGroupName":"会社","inputName":"","tagOrder":""}
  ,"office-tel1":{"tagName":"TEL:1","tag":"office-tel1","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
  ,"office-tel2":{"tagName":"TEL:2","tag":"office-tel2","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
  ,"office-tel3":{"tagName":"TEL:3","tag":"office-tel3","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
  ,"office-fax1":{"tagName":"FAX:1","tag":"office-fax1","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
  ,"office-fax2":{"tagName":"FAX:2","tag":"office-fax2","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
  ,"office-fax3":{"tagName":"FAX:3","tag":"office-fax3","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
  ,"office-tel-byte2":{"tagName":"半角→全角","tag":"office-tel-byte2","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
  ,"office-tel-hyphen":{"tagName":"-　挿入","tag":"office-tel-hyphen","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
  ,"office-zip1":{"tagName":"〒前","tag":"office-zip1","tagGroup":"office-zip","tagGroupName":"会社郵便","inputName":"","tagOrder":""}
  ,"office-zip2":{"tagName":"〒後","tag":"office-zip2","tagGroup":"office-zip","tagGroupName":"会社郵便","inputName":"","tagOrder":""}
  ,"office-zip-byte2":{"tagName":"半角→全角","tag":"office-zip-byte2","tagGroup":"office-zip","tagGroupName":"会社郵便","inputName":"","tagOrder":""}
  ,"office-zip-hyphen":{"tagName":"-　挿入","tag":"office-zip-hyphen","tagGroup":"office-zip","tagGroupName":"会社郵便","inputName":"","tagOrder":""}
  ,"office-pref":{"tagName":"都道府県","tag":"office-pref","tagGroup":"office-contact","tagGroupName":"会社住所","inputName":"","tagOrder":""}
  ,"office-city":{"tagName":"市区町村","tag":"office-city","tagGroup":"office-contact","tagGroupName":"会社住所","inputName":"","tagOrder":""}
  ,"office-addr":{"tagName":"詳細","tag":"office-addr","tagGroup":"office-contact","tagGroupName":"会社住所","inputName":"","tagOrder":""}
  ,"office-build":{"tagName":"ビル名","tag":"office-build","tagGroup":"office-contact","tagGroupName":"会社住所","inputName":"","tagOrder":""}
  ,"office-contact-byte2":{"tagName":"半角→全角","tag":"office-contact-byte2","tagGroup":"office-contact","tagGroupName":"会社住所","inputName":"","tagOrder":""}
  ,"office-contact-space":{"tagName":"空白挿入","tag":"office-contact-space","tagGroup":"office-contact","tagGroupName":"会社住所","inputName":"","tagOrder":""}
  };
  console.log("getform!!!!");
  return formnames;
}
const initialState = getform();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_GET_FOMENAMES':
    return Object.assign({}, state, action.payload);
    default:
      return state;

  }
};
