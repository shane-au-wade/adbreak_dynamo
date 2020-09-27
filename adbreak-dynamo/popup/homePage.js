console.log('popup script loaded')

chrome.storage.local.set({routine: "general"}, function() {
    console.log('local storage updated');
  });