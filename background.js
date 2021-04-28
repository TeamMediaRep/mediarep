chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      if (/^https:\/\/www\.target\.com\/p\//.test(url)) {
        console.log("bg runs");
        chrome.tabs.executeScript({
          file: "content.js",
        });
      }
    });
  }
});
