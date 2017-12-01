{% load static %}
<html>
...
<link rel="stylesheet" href="{% static 'star-ratings/css/star-ratings.css' %}">
<script type="text/javascript" src="{% static 'star-ratings/js/dist/star-ratings.min.js' %}"></script>
...
</html>

{% load ratings %}
<html>
...
{% ratings object %}
...
</html>





function create_rating(e){
  var url;
  adfreescore = document.getElementById("AdfreeScore").value;
  contentscore = document.getElementById("ContentScore").value;
  comment = document.getElementById("Comment").value;
  base_url = "http://localhost:8000/api/rating"
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(e) {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        consol.log("Success")
      }else if(xhr.status == 400){
        window.alert("Error: Please return your valid rating");
      }
    }
  };

  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
    url = tabs[0].url;
    xhr.open("POST", base_url, true); // FIXME localhost
    xhr.setRequestHeader("Content-type", "application/json");
    json_rating = JSON.stringify({
      adfreescore: adfreescore,
      contentscore: contentscore,
      comment: comment,
      url: url
    });
    xhr.send(json_rating);
  });
  //window.close();
 }

function sign_up(e) {
  chrome.tabs.create({
    url: "http://localhost:4200/welcome"
  });
}

function sign_in(e) {
  chrome.tabs.create({
    url: "http://localhost:4200/welcome"
  });
}

function duplicate_current_tab(e) {
  chrome.tabs.query({
    'active': true,
    'windowId': chrome.windows.WINDOW_ID_CURRENT
  }, function(tabs) {
    url = tabs[0].url;
    chrome.tabs.create({
      url: url
    });
  })
}

function get_post_score(){
  var url;
  chrome.tabs.query({
    'active': true,
    'windowId': chrome.windows.WINDOW_ID_CURRENT
  }, function(tabs) {
    url = tabs[0].url;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/api/score/" + url, false);
    var scores;
    xhr.onload = function() {
      if (xhr.readyState == 4 && xhr.status == "200") {
        scores = JSON.parse(xhr.responseText);
      } else if (xhr.status == "404") {
        //window.alert("No one evaluate this post yet. Please be the first one!");
      } else {
        window.alert("Error: fail to get score of this post")
      }
    }
    xhr.send();
    document.getElementById("post_adfreescore").innerHTML = scores['adfreescore'];
    document.getElementById("post_contentscore").innerHTML = scores['contentscore'];
    document.getElementById("numadfreerating").innerHTML = scores['numadfreerating'];
    document.getElementById("numcontentrating").innerHTML = scores['numcontentrating'];

  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("SubmitButton").addEventListener('click', create_rating);
  document.getElementById("sign_up").addEventListener('click', sign_up);
  document.getElementById("sign_in").addEventListener('click', sign_in);
  get_post_score()
});
