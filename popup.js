async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

getCurrentTab().then((tab)=> {
    chrome.runtime.sendMessage({ tab: tab }, function (response) {
        var lastError = chrome.runtime.lastError;
        if (lastError) {
            console.log(lastError.message);
            document.body.style.backgroundColor = 'red';
            document.getElementById("message").innerText = "Failed!"
            return;
        }
        navigator.clipboard.writeText(response.result);
        document.body.style.backgroundColor = 'yellow';
        document.getElementById("message").innerText = "Copied!"
    });
})
