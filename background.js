async function getShortlink(url) {
  try {
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    config["body"] = JSON.stringify({longUrl: url})
    let response = await fetch('https://p-li/rest/v2/short-urls', config);
    if (response.ok) {
      let data = await response.json();
      await navigator.clipboard.writeText(data.url);
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
