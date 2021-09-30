console.log("testing");

setTimeout(()=>{
    // document.body.innerHTML = document.body.innerHTML.replace("Pelosi", "Shirley");

  }, 3000)

  function repl(find, replace){
    console.log("replacing", find, "with", replace)
    // info on the regular expression here: https://www.designcise.com/web/tutorial/how-to-replace-all-occurrences-of-a-word-in-a-javascript-string
    var finder = new RegExp(find,"g");
    // we replace the entire website's content with itself, but replace every occurence of
    // the word that "finder" carries with the word that "replace" carries
    // e.g. repl("Moon", "Potato")
    document.body.innerHTML = document.body.innerHTML.replace(finder, replace);
  }
function gotMessage(request, sender, sendResponse){
    console.log(request);
}
chrome.runtime,onMessage.addListener(gotMessage);