
// background.js
chrome.webNavigation.onCompleted.addListener(function (details) {
    // Send a message to the content script of the tab
    chrome.tabs.sendMessage(details.tabId, { action: 'copyPageContent' });
  });
  