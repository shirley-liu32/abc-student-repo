//when clicking on the icon, a new tab will open (our studio ghibli player page)
chrome.browserAction.onClicked.addListener(function(){
    chrome.tabs.create({url: chrome.extension.getURL("ghibli/index.html")});
});