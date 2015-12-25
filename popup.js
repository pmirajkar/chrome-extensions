function renderStatus(site, time, data) {
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
  sortedSites.sort(function(a, b) {
     return b[1] - a[1];
  });

  for (var i = 0; i < sortedSites.length && i < 10; i++ ) {
    var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, Math.ceil(sortedSites[i][1]));
    renderStatus(sortedSites[i][0], myDate);
  }
});
