const axios = require('axios')

let sendGeneralMessage = async (channel_ID, text) => {
    //console.log('sending general message')
    try {
        let response = await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,{} , {
        params: {
            chat_id: channel_ID,
            text: text
         }
        })
    } catch (error) {
        console.log('Error in General Message',error)
    }
    
}

let sendStartMessage = async (params) => {
    //console.log('sending start message')
    try {
        let response = await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,{} , {
        params: {
            chat_id: process.env.CHAT_ID,
            text: `Now Monetizing 💸 ${params.channel} | Short Videos: ${params.shortVideos}, Long Videos: ${params.longVideos}`
         }
        })
    } catch (error) {
        console.log('Error in Start Message',error)
    }
}

let sendEndShortMessage = async (params) => {
    //console.log('sending End Short message')
    try {
        let response = await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,{} , {
        params: {
            chat_id: process.env.CHAT_ID,
            text: `Update ✔️ ${params.channel} | Short Videos Monetized: ${params.index}`
         }
        })
    } catch (error) {
        console.log('Error in End Short Message',error)
    }
}

let sendEndLongMessage = async (params) => {
    //console.log('sending End Short message')
    try {
        let response = await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,{} , {
        params: {
            chat_id: process.env.CHAT_ID,
            text: `Update ✔️ ${params.channel} | Long Videos Monetized: ${params.index}`
         }
        })
    } catch (error) {
        console.log('Error in End Long Message',error)
    }
}


module.exports = {sendStartMessage, sendEndShortMessage, sendEndLongMessage, sendGeneralMessage}