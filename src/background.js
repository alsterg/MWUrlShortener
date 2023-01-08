async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function getShortUrl(url) {
  console.log('Shortlink: getShortUrl for ' + url)
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
    let response = await fetch('https://p-li.prod.mwam.local/rest/v2/short-urls', config);
    if (response.ok) {
      let data = await response.json();
      let shortUrl = data.shortUrl
      return { 'error': false, 'shorturl': shortUrl };
    } else {
      console.error("Shortlink: HTTP-Error: " + response.status);
      return { 'error': true, 'message': "HTTP-Error: " + response.status };
    }
  } catch (e) {
    console.error("Shortlink: Exception: " + e);
    return { 'error': true, 'message': e.message };
  }
}

processing = false  // Prevent processing while a previous message is being processed
chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    if (message.action != "getShortUrl") return;
    if (processing) return;
    processing = true;

    console.log("Shortlink: processing 'getShortUrl' event");
    getCurrentTab().then((tab) => {
      if (tab == undefined) {
        console.error('Shortlink: failed to get current tab');
        sendResponse({'error': true, 'message': 'failed to get current tab'});
        processing = false;
        return;
      }
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getShortUrl,
        args: [tab.url],
      },
        (result) => {  // we expect a single result
          if (result[0].result.error) {
            sendResponse(result[0].result);  // {error, message}
            return
          }
          let shorturl = result[0].result.shorturl;
          console.log('Shortlink: got short link: ' + shorturl);
          chrome.tabs.sendMessage(tab.id, { 'action': 'copyToClipboard', 'shorturl': shorturl },
            function (response) {
              if (response.error)
                sendResponse(response);
              else
                sendResponse({ 'error': false, 'shorturl': shorturl });
            });

          processing = false;
        });
    });
    return true;
  }
);
