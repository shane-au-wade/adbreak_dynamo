
const runAdbreakAuto = () => {

    if(document.location.href.indexOf("https://studio.youtube.com/channel") >= 0) // if this is the
    {
        let videoRows = document.getElementsByTagName("ytcp-video-row")

        for(let j = 0; j < videoRows.length; ++j) {
            videoRows[j].isHighlighted = true;
        }

        setTimeout(() => {
            let elems = document.getElementsByClassName("style-scope ytcp-video-list-cell-video hover-item")
            for(let i = 0; i < elems.length; ++i){
                if(elems[i].href) {
                    if(elems[i].href.indexOf('monetization') >= 0){
                    console.log(elems[i].href)
                    window.open(elems[i].href, '_blank')
                    }
                }
            }
        }, 500)
    }
    else{
        alert('Unable to run ad break auto on this page')
    }
    
}

function checkBoxesCopy() {
    var copyText = document.querySelector("#highlight_code");
    //copyText.value = `  let videoRows = document.getElementsByTagName("ytcp-video-row");for(let j = 0; j < videoRows.length; ++j) {videoRows[j].isHighlighted = true;};`
    copyText.innerText.select();
    document.execCommand("copy");
  }

// document.querySelector("#runAdbreakAuto").addEventListener("click", runAdbreakAuto);
// document.querySelector("#highlight_button").addEventListener("click", LaunchCopy);

//  "browser_action": {
    //     "default_popup": "homePage.html"
    //   }