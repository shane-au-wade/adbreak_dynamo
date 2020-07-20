


console.log('script loaded')

function LaunchCopy() {
    console.log('executing copy')
    var copyText = document.querySelector("#launch_code");
    copyText.value = `
    let videoRows = document.getElementsByTagName("ytcp-video-row");
    for(let j = 0; j < videoRows.length; ++j) {
        videoRows[j].isHighlighted = true;
    };
    let elems = document.getElementsByClassName("style-scope ytcp-video-list-cell-video hover-item");
    let linkCount = 0;
    for(let i = 0; i < elems.length; ++i){
        if(elems[i].href) {
            if(elems[i].href.indexOf('monetization') >= 0){
            console.log(elems[i].href);
            window.open(elems[i].href, '_blank');
            linkCount++;
            }
        }
    };
    `
    copyText.select();
    document.execCommand("copy");
  }

function checkBoxesCopy() {
    var copyText = document.querySelector("#check_code");
    copyText.value = `
    let checkBoxs = document.getElementsByTagName("ytcp-checkbox-lit");
    for(let i = 0; i < checkBoxs.length; ++i){
        if(!checkBoxs[i].disabled && checkBoxs[i].checked === false) {
            checkBoxs[i].click()
        }
    };
    
    let buttons = document.getElementsByTagName("ytcp-button");
    for(let i = 0; i < buttons.length; ++i) {
        if(buttons[i].id === 'save') {
            buttons[i].click()
        }
    };`
    copyText.select();
    document.execCommand("copy");
  }
  
  
  document.querySelector("#launch_button").addEventListener("click", LaunchCopy);
  document.querySelector("#check_button").addEventListener("click", checkBoxesCopy);