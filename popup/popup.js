console.log("This is a popup.")

document.getElementById("messageButton").onclick = () => {
  chrome.runtime.sendMessage({ message: "hello" })
}
