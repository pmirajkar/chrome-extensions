// This map is used to save websites visited and time spent on each of the websites
var map = {};

// Get current time when this script was loaded first.
var startTime = new Date().getTime();

// Last visited tab. At loading this is empty.
var lastTabURL = null

localStorage.clear();

function updateTime(url, seconds) {
  var urlTimeMap = JSON.parse(localStorage.urlTimeMap);
  if (!urlTimeMap[url]) {
    urlTimeMap[url] = 0;
  }
  urlTimeMap[url] = urlTimeMap[url] + seconds;
  console.log("Here::::" + url + ":" + urlTimeMap[url]);
  localStorage.urlTimeMap = JSON.stringify(urlTimeMap);
}

function computeTime() {
  console.log("Compute Time" + new Date());
  chrome.tabs.query({active: true}, function(tabs) {
    chrome.windows.get(tabs[0].windowId, function(window) {
      var url = tabs[0].url;
      if (!window.focused) {
        // This get reset even if window is not focused.
        startTime = new Date().getTime();
        console.log("Window not focused " + "::" + url);
        return;
      }
      console.log("Compute Time " + "::" + url);
      var diffTime = new Date().getTime() - startTime;

      if(lastTabURL === null) {
        lastTabURL = url;
        return;
      }
      // This get reset even if window is not focused.
      startTime = new Date().getTime();
      updateTime(getDomain(lastTabURL), diffTime/1000);

      lastTabURL = url;
    });
  });
}

function addEventListeners() {
  // A new tab has been activated. Record time for the last tab.
  chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log("onActivated " + activeInfo.tabId + "::" + activeInfo.windowId);
    computeTime();
  });

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status == "loading" && changeInfo.url !== undefined) {
      console.log("onUpdated " + tabId + "::" + changeInfo.url + "::" + changeInfo.status);
    }
    computeTime();
  });

  chrome.windows.onFocusChanged.addListener(function(windowId) {
    console.log("onFocusChanged " + windowId);
    computeTime();
  });
}

function init() {
  if (!localStorage.urlTimeMap) {
    localStorage.urlTimeMap = JSON.stringify({});
  }

  addEventListeners();

  window.setInterval(computeTime, 60 * 1000);
}

init();
