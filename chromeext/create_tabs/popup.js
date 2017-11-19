// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


//function click(e) {
//  chrome.tabs.executeScript(null,
//      {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
//  window.close();
//}

function send_url(e){
  var url;
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
    url = tabs[0].url
  });
  //TODO we should send url to django server and django server save this url to databse.
}

function create_naver(e){
  chrome.tabs.create({url: "http://www.naver.com"});
}

document.addEventListener('DOMContentLoaded', function () {
  // alert url when click the extension button
  //chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
  //  url = tabs[0].url;
  //  alert(url);
  //});

  document.getElementById("create_tab_naver").addEventListener('click', create_naver);
  document.getElementById("send_url").addEventListener('click', send_url);
});
