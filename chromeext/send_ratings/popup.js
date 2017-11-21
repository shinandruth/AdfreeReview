function send_url(e){
  var xhr = new XMLHttpRequest();
  var url;
  adfreescore = document.getElementById("AdfreeScore").value;
  contentscore = document.getElementById("ContentScore").value;
  comment = document.getElementById("Comment").value;
  base_url = "http://localhost:8000/api/rating/"

  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
    url = tabs[0].url;
    GET_url = base_url.concat(adfreescore).concat('/'+contentscore).concat('/'+comment).concat('/'+url+'/');
    //chrome.tabs.create({url: GET_url});
    xhr.open("GET", GET_url, false);  // FIXME localhost
    xhr.send();
  });
  window.close();
 }

function create_naver(e){
  chrome.tabs.create({url: "http://www.naver.com"});
}

function duplicate_current_tab(e){
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
    url = tabs[0].url;
    chrome.tabs.create({url: url});
  })
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("create_tab_naver").addEventListener('click', create_naver);
  document.getElementById("duplicate_current_tab").addEventListener('click', duplicate_current_tab);
  document.getElementById("SubmitButton").addEventListener('click', send_url);
});
