chrome.browserAction.onClicked.addListener(function(){
    chrome.tabs.create({url: chrome.extension.getURL("popup/index.html")});
});