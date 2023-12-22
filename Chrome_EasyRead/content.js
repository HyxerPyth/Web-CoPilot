// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'copyPageContent') {
      let bodyText = document.body.innerText;
      chrome.storage.local.set({ 'copiedContent': bodyText }, function () {
        console.log('Copied content stored:', bodyText);
      });
    }
  });
  