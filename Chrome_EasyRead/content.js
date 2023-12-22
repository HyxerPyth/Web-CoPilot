// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'copyPageContent') {
    // Get the text content before removing elements
    var bodyText = document.body.innerText;
    
    // Remove all elements from the document
    document.body.innerHTML = '';
    document.body.innerHTML = bodyText;

    // Store the copied content
    chrome.storage.local.set({ 'copiedContent': bodyText }, function () {
      console.log('Copied content stored:', bodyText);
      clipBoard = bodyText;
    });

  } else if (request.action === 'pasteCopiedContent') {
    chrome.storage.local.get('copiedContent', function (data) {
      var copiedContent = data.copiedContent || 'No content copied yet.';
      insertCopiedContent(copiedContent);
    });
  }
});

let clipBoard 


function insertCopiedContent(content) {
  // Insert the copied content into the document (replace the body)
  document.body.innerHTML = '<pre>' + content + '</pre>';
}
