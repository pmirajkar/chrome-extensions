function getDomain(url) {
  // Removes http://www or https://www or http:// or https:// from URL
  url = url.replace(/https?:\/\/(www.)?/i, '');
  return url.split('/')[0];
}
