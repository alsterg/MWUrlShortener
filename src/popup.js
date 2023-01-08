function on_page_load() {
    chrome.runtime.sendMessage({ "action": "getShortUrl" }, function (response) {
        // If an error occurs while connecting to the extension, the callback will
        // be called with no arguments and runtime.lastError will be set to the error message.
        if (response === undefined && chrome.runtime.lastError) {
            console.error('Shortlink: error: ' + chrome.runtime.lastError.message);
            document.getElementById("page").style.backgroundColor = 'red';
            document.getElementById("message").innerText = "Failed!\n" + chrome.runtime.lastError.message;
            return;
        }
        if (response.error) {
            console.error('Shortlink: error');
            document.getElementById("page").style.backgroundColor = 'red';
            document.getElementById("message").innerText = "Failed!\n" + response.message;
            return
        }

        document.getElementById("page").style.backgroundColor = 'yellow';
        document.getElementById("message").innerText = "Copied!\n" + response.shorturl;
    });
};

// TODO: For some reason this is triggered twice for every plugin click.
// The second invocation logs some errors, but otherwise harmless.
document.addEventListener('DOMContentLoaded', function() {
    on_page_load();
}, { once: true });