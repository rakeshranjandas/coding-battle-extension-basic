const filter = {
  url: [
    {
      urlMatches: "https://youtube.com/",
      pathContains: "shorts",
    },
  ],
}

chrome.webNavigation.onHistoryStateUpdated.addListener((e) => {
  const newURL = e.url.replace("shorts", "watch")
  console.log(newURL)

  chrome.tabs.update(e.tabId, { url: newURL })
}, filter)

chrome.runtime.onMessage.addListener((request) => {
  console.log("received", request.message)
})
