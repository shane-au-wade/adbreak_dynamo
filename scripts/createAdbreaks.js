
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const genFormattedString = async (number) => {

    return new Promise ((resolve, reject) => {
        let finalStr = ""
        if(number >= 10) {
            finalStr = finalStr + number + ':00'
            resolve(finalStr)
        }
        else {
            finalStr = finalStr + '0' + number + ':00'
            resolve(finalStr)
        }
    })

}

const createAdbreaks = async (timeInterval) => {
    let timeStamp = await document.querySelector('div.label.style-scope.ytcp-thumbnail').innerText
    let adBreaksButton = await document.querySelector('#add-ad-break')
    let timeArr = timeStamp.split(':')
    let vidMinutes = parseInt(timeArr[0])
    vidMinutes = vidMinutes/timeInterval // lets say 5 minutes
    let interval = Math.floor(vidMinutes)
    for(let i=0; i < interval; ++i) {
        adBreaksButton.click()
        await sleep(500)
    }
    await sleep(1000)
    for(let i=0; i < interval; ++i) {
        //focus, update value, blur
        // let adbreakRows = await document.querySelectorAll('div.ad-break-row.style-scope.ytve-ad-breaks-editor-options-panel')
        let inputs = await document.querySelectorAll("ytve-formatted-input")
        await sleep(1000)
        //console.log(inputs)
        inputs[0].onFocus()
        let val = (i + 1)*timeInterval
        inputs[0].childNodes[1].value = await genFormattedString(val)
        inputs[0].onBlur()
        await sleep(1000)
    }

}

createAdbreaks(4)




////////

//let con = document.querySelector('#save-button')


const createTimes = async (timeInterval) => { 
    
    function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }; 
    
    const genFormattedString = (number) => {
         return new Promise ((resolve, reject) => {
              let finalStr = ""; 
                if(number < 10) {
                    finalStr = finalStr + "0" + number + ":00"; 
                    resolve(finalStr); 
                } else if(number >= 10 && number < 60) { 
                    finalStr = finalStr + number + ":00"; 
                    resolve(finalStr); 
                } else if(number > 60){ 
                    let hours = number/60;
                    hours = Math.floor(hours)
                    number -= hours*60
                    finalStr = finalStr + hours + ":" + number + ":00"
                    resolve(finalStr)
                } 
            }); 
        }; 

        let timeStamp = await document.querySelector("div.label.style-scope.ytcp-thumbnail").innerText; 
        let adBreaksButton = await document.querySelector('#add-ad-break');
        let timeArr = timeStamp.split(":"); 
        if( timeArr.length === 3)
        {
            // this is an hour long video
            console.log('house long vid');
            let hours = parseInt(timeArr[0]);
            let additionalMins = hours*60;
            let vidMinutes = parseInt(timeArr[1]); 
            vidMinutes += additionalMins;
            vidMinutes = vidMinutes/timeInterval; 
            let interval = Math.floor(vidMinutes); 

            for(let i=0; i < interval; ++i) {
                adBreaksButton.click();
                await sleep(100);
            };

            for(let i=0; i < interval; ++i) {
             let inputs = await document.querySelectorAll("ytve-formatted-input"); 
             await inputs[0].onFocus(); 
             let val = (i + 1)*timeInterval; 
             inputs[0].childNodes[1].value = await genFormattedString(val); 
             inputs[0].onBlur(); 
             await sleep(500); 
            } 
        } else {
            let vidMinutes = parseInt(timeArr[0]); 
             vidMinutes = vidMinutes/timeInterval; 
            let interval = Math.floor(vidMinutes); 

            for(let i=0; i < interval; ++i) {
                adBreaksButton.click();
                await sleep(100);
            };

            // for(let i=0; i < interval; ++i) {
            //  let inputs = await document.querySelectorAll("ytve-formatted-input"); 
            //  await inputs[0].onFocus(); 
            //  let val = (i + 1)*timeInterval; 
            //  inputs[0].childNodes[1].value = await genFormattedString(val); 
            //  inputs[0].onBlur(); 
            //  await sleep(500); 
            // }; 
        }
        

        let con = await document.querySelector("#save-button");
        con.click();
        setTimeout( () => {
            let buttons = document.getElementsByTagName("ytcp-button");
            for(let i = 0; i < buttons.length; ++i) {
                if(buttons[i].id === "save") {
                    console.log("changes saved");
                    buttons[i].click();
                }
            }

            setTimeout( () => {
                open(location, '_self').close();
            }, 3000);

        }, 2000);
       
}; createTimes(4);




const createTimes = async (timeInterval) => { function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }; const genFormattedString = async (number) => { return new Promise ((resolve, reject) => { let finalStr = ""; if(number >= 10) { finalStr = finalStr + number + ":00"; resolve(finalStr); } else { finalStr = finalStr + "0" + number + ":00"; resolve(finalStr); } }); }; let timeStamp = await document.querySelector("div.label.style-scope.ytcp-thumbnail").innerText; let timeArr = timeStamp.split(":"); let vidMinutes = parseInt(timeArr[0]); vidMinutes = vidMinutes/timeInterval; let interval = Math.floor(vidMinutes); for(let i=0; i < interval; ++i) { let inputs = await document.querySelectorAll("ytve-formatted-input"); await inputs[0].onFocus(); let val = (i + 1)*timeInterval; inputs[0].childNodes[1].value = await genFormattedString(val); inputs[0].onBlur(); await sleep(500); }; let con = await document.querySelector("#save-button"); con.click(); setTimeout( () => { let buttons = document.getElementsByTagName("ytcp-button"); for(let i = 0; i < buttons.length; ++i) { if(buttons[i].id === "save") { console.log("changes saved"); buttons[i].click(); } } setTimeout( () => { open(location, '_self').close(); }, 2000); }, 2000); }; createTimes(4);
