let sendAdbreaksHTTPRequest = () => {
    // send a request to the local express server with the
    // approximate number of open tabs 
    let approxOpenTabs = plus10MinVides.length
    let url = `http://localhost:3000/robot/createAdbreaks/${approxOpenTabs}`
    fetch(url, {
        mode: 'no-cors', // no-cors, *cors, same-origin
    });
}