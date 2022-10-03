document.addEventListener("DOMContentLoaded", function () {
    //Get Reference to Functions
    backGround = chrome.extension.getBackgroundPage();
    //Call Function
    backGround.getShortlink("XXX");
});