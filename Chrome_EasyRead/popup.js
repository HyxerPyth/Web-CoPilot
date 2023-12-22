// popup.js
document.addEventListener('DOMContentLoaded', function () {
  let copyButton = document.getElementById('copyButton');
  copyButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'copyPageContent' });
    });
  });
});
