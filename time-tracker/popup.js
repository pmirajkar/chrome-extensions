function getTime(seconds) {
  var date = new Date(seconds * 1000);
  var h = date.getUTCHours();
  var m = date.getUTCMinutes();
  var s = date.getSeconds();

  // padding 0s
  if (h < 10) {h = "0"+h;}
  if (m < 10) {m = "0"+m;}
  if (s < 10) {s = "0"+s;}

  return h+":"+m+":"+s;
}

function renderStatus(site, time) {
  var sitenode = document.createTextNode(site);
  var td1 = document.createElement("td");

  var timenode = document.createTextNode(time);
  var td2 = document.createElement("td");

  var tr = document.createElement("tr");

  td1.appendChild(sitenode);
  td2.appendChild(timenode);
  tr.appendChild(td1);
  tr.appendChild(td2);

  document.getElementById("table").appendChild(tr);
}

document.addEventListener('DOMContentLoaded', function() {
  var urlTimeMap = JSON.parse(localStorage.urlTimeMap);

  var sortedSites = new Array();
  var totalTime = 0;
  for (site in urlTimeMap) {
     sortedSites.push([site, urlTimeMap[site]]);
     totalTime += urlTimeMap[site];
  }

  // sorting in descending order, hence b - a
  sortedSites.sort(function(a, b) {
     return b[1] - a[1];
  });

  for (var i = 0; i < sortedSites.length && i < 10; i++ ) {
    renderStatus(sortedSites[i][0], getTime(Math.ceil(sortedSites[i][1])));
  }
});
