async function getShortUrl(url) {
  try {
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': '71da842c-c2bd-462d-8d1d-d856368c2791'
      }
    };

    config["body"] = JSON.stringify({longUrl: url})
    let response = await fetch('https://p-li/rest/v2/short-urls', config);
    if (response.ok) {
      let data = await response.json();
      return data.shortUrl;
    } else {
      alert("HTTP-Error: " + response.status);
    }
  } catch (e) {
    alert("Exception: " + e);
  }
}

processing = false
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (processing) return;
    processing = true;
    chrome.scripting.executeScript({
      target: { tabId: request.tab.id },
      func: getShortUrl,
      args: [request.tab.url],
    },
      (results) => {
        for (const result of results) {
          console.log('Shortlink: ' + result.result);
          sendResponse({ result: result.result });
          processing = false;
        }
      });
    return true;
  }
);