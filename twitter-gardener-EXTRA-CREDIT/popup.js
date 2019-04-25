// NOTE TO STUDENT: You should NOT have to modify this file.

function sendMessage(gardeningInProgress)
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var port = chrome.tabs.connect(tabs[0].id);
    port.postMessage(gardeningInProgress);
  });
}

document.addEventListener('DOMContentLoaded', function()
{
  document.querySelector('#start').addEventListener(
    'click', () => sendMessage(true) );
  document.querySelector('#stop').addEventListener(
    'click', () => sendMessage(false) );
});
