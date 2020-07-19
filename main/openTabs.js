let main = async () => {
    let inputText = ``
    let hrefKeysArr = []
    let videoRows = document.getElementsByTagName("ytcp-video-row")

    for(let i = 0; i < videoRows.length; ++i) {
        //console.log(videoRows[i].innerHTML)
        inputText += videoRows[i].innerHTML
    }

    let inputArr = inputText.split(' ')


    await inputArr.forEach(key => {
        //console.log(key)
        if(key.indexOf('href') >= 0)
        {
            //this key has an important link
            //check for moneization key in href
            if(key.indexOf('monetization') >= 0) {
                hrefKeysArr.push(key)
            }
        }
    })

    //console.log('Href keys: ', hrefKeysArr)
    let elems = []



    await hrefKeysArr.forEach(link => {
        let linkPos = link.indexOf('/')
        let url = link.substring(linkPos, link.length - 2)
        //console.log(url)

        let aTagElem = document.createElement('a')
        aTagElem.href = url
        aTagElem.innerHTML =  `<ytcp-icon-button track-click="" id="undefined" class="style-scope ytcp-video-list-cell-video" icon="editor:attach-money" tooltip-label="Monetization" ve-type="90929" tabindex="0" aria-disabled="false" aria-label="Monetization" role="button"><iron-icon class="remove-defaults style-scope ytcp-icon-button"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope iron-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope iron-icon"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" class="style-scope iron-icon"></path></g></svg>
        </iron-icon><paper-ripple class="circle style-scope ytcp-icon-button">`
        elems.push(elems)
        //window.open(aTagElem.href, '_blank');
        //setTimeout(function(){ }, 3000);
    })

    console.log(elems)

}


main()




`/video/Yo2OAhI8XO4/monetization/ad
VM8059:30 /video/fXuavwh6reY/monetization/ad
VM8059:30 /video/KYzzAMj7SVk/monetization/ad
VM8059:30 /video/S1FrZFtGZMc/monetization/ad
VM8059:30 /video/a_7K8RTlo0I/monetization/ad
VM8059:30 /video/A9Y4sYn86jU/monetization/ad
VM8059:30 /video/5piD3p6-73A/monetization/ad
VM8059:30 /video/PRC3TaJstnM/monetization/ad
VM8059:30 /video/1pV0ixJ22LQ/monetization/ad
VM8059:30 /video/E_JNPxgQsoM/monetization/ad
VM8059:30 /video/0_wBDPOatlE/monetization/ad
VM8059:30 /video/2rewoHQxG-o/monetization/ad
VM8059:30 /video/BAwEB3J-jNw/monetization/ad
VM8059:30 /video/KFmvXl-8wac/monetization/ad
VM8059:30 /video/K0z5BflaTbA/monetization/ad
VM8059:30 /video/S3ap05OV2l0/monetization/ad
VM8059:30 /video/nkijgcLieLY/monetization/ad
`
`
<a tabindex="-1" id="" class="style-scope ytcp-video-list-cell-video hover-item" href="/video/Yo2OAhI8XO4/monetization/ads" target="">
          
          <ytcp-icon-button track-click="" id="undefined" class="style-scope ytcp-video-list-cell-video" icon="editor:attach-money" tooltip-label="Monetization" ve-type="90929" tabindex="0" aria-disabled="false" aria-label="Monetization" role="button"><iron-icon class="remove-defaults style-scope ytcp-icon-button"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope iron-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope iron-icon"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" class="style-scope iron-icon"></path></g></svg>
</iron-icon><paper-ripple class="circle style-scope ytcp-icon-button">

    <div id="background" class="style-scope paper-ripple"></div>
    <div id="waves" class="style-scope paper-ripple"></div>
</paper-ripple></ytcp-icon-button>
        </a>

`

let link = document.createElement('a')
link.href = '/video/Yo2OAhI8XO4/monetization/ads'
link.innerHTML =  `<ytcp-icon-button track-click="" id="undefined" class="style-scope ytcp-video-list-cell-video" icon="editor:attach-money" tooltip-label="Monetization" ve-type="90929" tabindex="0" aria-disabled="false" aria-label="Monetization" role="button"><iron-icon class="remove-defaults style-scope ytcp-icon-button"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope iron-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope iron-icon"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" class="style-scope iron-icon"></path></g></svg>
</iron-icon><paper-ripple class="circle style-scope ytcp-icon-button">`