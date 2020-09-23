let links = [
    'one',
    'two',
    'three',
    'four',
    'random'
]

document.addEventListener('readystatechange', (event) => {
    //console.log(`readystate: ${document.readyState}\n`);
    if(document.readyState === 'complete')
    {
        setTimeout( () => {
            console.log('test.js script loaded')
           for(let index = 0; index < links.length; index++){
              localStorage.setItem(index, links[index])
           }
        }, 1000)
    }
});