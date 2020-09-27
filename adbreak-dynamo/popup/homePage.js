console.log('popup script loaded')

chrome.storage.local.set({test: "general"}, function() {
    console.log('local storage updated');
  });