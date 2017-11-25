function send_url(e){
  var url;
  adfreescore = document.getElementById("AdfreeScore").value;
  contentscore = document.getElementById("ContentScore").value;
  comment = document.getElementById("Comment").value;
  base_url = "http://localhost:8000/api/rating"
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(e) {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        window.alert(xhr.responseText);
      }else if(xhr.status == 400){
        window.alert("Error: Please return your valid rating");
      }else{
        window.alert("Error!");
      }
    }
  };

  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
    url = tabs[0].url;
    xhr.open("POST", base_url, true);  // FIXME localhost
    xhr.setRequestHeader("Content-type", "application/json");
    json_rating = JSON.stringify({adfreescore: adfreescore, contentscore: contentscore, comment:comment, url:url});
    xhr.send(json_rating);
  });
  window.close();
 }

function sign_up(e){
  chrome.tabs.create({url: "http://localhost:4200/welcome"});
}

function duplicate_current_tab(e){
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
    url = tabs[0].url;
    chrome.tabs.create({url: url});
  })
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("sign_up").addEventListener('click', sign_up);
  document.getElementById("duplicate_current_tab").addEventListener('click', duplicate_current_tab);
  document.getElementById("SubmitButton").addEventListener('click', send_url);
});
