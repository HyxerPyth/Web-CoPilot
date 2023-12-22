// popup.js
document.addEventListener('DOMContentLoaded', function () {
  var copyButton = document.getElementById('copyButton');
  var pasteButton = document.getElementById('pasteButton');

  copyButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'copyPageContent' });
    });
  });

  pasteButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'pasteCopiedContent' });
    });
  });
});
