console.log('behind the scenes loaded')

chrome.browserAction.setPopup({popup: "./popup/homePage.html"}, () => {
    console.log('popup set')
})
