async function getShortlink(url) {
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
      await navigator.clipboard.writeText(data.shortUrl);

      chrome.notifications.create('NOTFICATION_ID', {
        type: 'basic',
        iconUrl: 'path',
        title: 'notification title',
        message: 'notification message',
        priority: 2
      })
      setTimeout(function() {
        chrome.notifications.clear('NOTFICATION_ID');
      }, 2000);
    } else {
      alert("HTTP-Error: " + response.status);
    }
  } catch (e) {
    alert("Exception: " + e);
  }
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getShortlink,
    args: [tab.url],
  },
    (injectionResults) => {
      for (const frameResult of injectionResults)
        console.log('Shortlink: ' + frameResult.result);




    });
});