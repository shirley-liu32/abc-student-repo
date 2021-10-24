
let counter = 0;

function handleMessage(request, sender, sendResponse) {
    console.log(request);
    if(request.type =="increaseCounter"){
        counter ++;
    }else if  (request.type == "getCount"){
        sendResponse(counter);
    }
    console.log("counter in background script",counter);
  }
  
  chrome.runtime.onMessage.addListener(handleMessage);