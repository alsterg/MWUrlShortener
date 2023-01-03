// source: https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
function copyToClipboard(textToCopy) {
    // NOTE: The navigator.clipboard method produced this error:
    // Shortlink: clipboard failed to be updated: NotAllowedError: Document is not focused.

    // navigator clipboard api needs a secure context (https)
    //if (navigator.clipboard && window.isSecureContext) {
    //    // navigator clipboard api method'
    //    return navigator.clipboard.writeText(textToCopy);
    //} else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    //}
}

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message.action != "copyToClipboard") {
            return;
        }
        console.log("Shortlink: processing 'copyToClipboard' event");
        copyToClipboard(message.shorturl).then(() => {
            console.log('Shortlink: clipboard updated');
            sendResponse({ 'error': false});
        }).catch((e) => {
            console.error('Shortlink: clipboard failed to be updated: ' + e);
            sendResponse({ 'error': true, 'message': e.message });
        });
        return true;
    }
);