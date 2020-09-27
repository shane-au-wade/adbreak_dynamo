console.log('endpoint has been reached')

let sendStopHttpRequest = async () => {
    let url = `http://localhost:3000/notify/long-end/${localStorage.getItem('channel')}/${localStorage.getItem('index')}`
    fetch(url, {
        method: 'post',
        mode: 'no-cors', // no-cors, *cors, same-origin
    });
}

document.addEventListener('readystatechange', (event) => {
    //console.log(`readystate: ${document.readyState}\n`);
    if(document.readyState === 'complete')
    {
        setTimeout( () => {
            sendStopHttpRequest()
        }, 1000)
    }
});