 // funtion to execute when any message arrives
  function gotMessage(request, sender, sendResponse){
    // request includes the actual message
    console.log(request);
  

  
  }
  
  // listening for messages:
  chrome.runtime.onMessage.addListener(gotMessage);
  // more on messaging: https://developer.chrome.com/extensions/messaging