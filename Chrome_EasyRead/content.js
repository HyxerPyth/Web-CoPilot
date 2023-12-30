// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'copyPageContent') {
    // Get the outer HTML of the body element
    var bodyHtml = document.body.innerText;

    gptRequest(bodyHtml);

    // Store the copied content
    chrome.storage.local.set({ 'copiedContent': bodyHtml }, function () {
      console.log('Copied content stored:', bodyHtml);
    });

  } else if (request.action === 'pasteCopiedContent') {
    chrome.storage.local.get('copiedContent', function (data) {
      var copiedContent = data.copiedContent || 'No content copied yet.';
      insertCopiedContent(copiedContent);
    });
  }
});

function insertCopiedContent(content) {
  // Create a temporary div element
  var tempDiv = document.createElement('div');
  
  // Set the innerHTML of the div to the copied content
  tempDiv.innerHTML = content;

  // Replace the body with the content of the div
  document.body.parentNode.replaceChild(tempDiv.firstChild, document.body);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'pasteCopiedContent') {
    chrome.storage.local.get('copiedContent', function (data) {
      var copiedContent = data.copiedContent || 'No content copied yet.';
      insertCopiedContent(copiedContent);
    });
  }
});


// GPT REQUEST OPEN AI

async function gptRequest(textHTML) {
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": " YOUR OPEN AI KEY"
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        prompt: `Give one paragraph summary of what is the difference between arrow fucntion and regualr function: ${textHTML}`,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData.choices[0].text)
  } catch (error) {
    console.error('Error:', error.message);
  }
}
